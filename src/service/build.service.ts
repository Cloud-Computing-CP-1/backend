import { simpleGit } from 'simple-git';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export type SupportedRuntime = 'NODEJS' | 'PYTHON' | 'GO';

export class BuildService {
    // Detect project language by checking for manifest files in the repo root
    private async detectLanguage(workspacePath: string): Promise<SupportedRuntime> {
        const hasPackageJson = fs.existsSync(path.join(workspacePath, 'package.json'));
        const hasRequirementsTxt = fs.existsSync(path.join(workspacePath, 'requirements.txt'));
        const hasGoMod = fs.existsSync(path.join(workspacePath, 'go.mod'));

        if (hasPackageJson) return 'NODEJS';
        if (hasRequirementsTxt) return 'PYTHON';
        if (hasGoMod) return 'GO';

        throw new Error('Unsupported repository structure: No package.json, requirements.txt, or go.mod found in root.');
    }

    // Generates a Dockerfile in the workspace based on the detected runtime
    private async generateDockerfile(runtime: SupportedRuntime, workspacePath: string): Promise<void> {
        let dockerfileContent = '';

        if (runtime === 'NODEJS') {
            const hasMigrations = fs.existsSync(path.join(workspacePath, 'migrations'));
            const migrationsCopyCmd = hasMigrations ? 'COPY migrations ./migrations' : '';
            dockerfileContent = `
# Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Production Image
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
${migrationsCopyCmd}
EXPOSE 3000 
CMD ["npm", "start"]
      `.trim();
    } else if (runtime === 'PYTHON') {
      dockerfileContent = `
# Build
FROM python:3.10-slim AS builder
WORKDIR /app
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Production Image
FROM python:3.10-slim
WORKDIR /app
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
      `.trim();
    } else if (runtime === 'GO') {
      dockerfileContent = `
# Build
FROM golang:1.20-alpine AS builder
WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN go build -o main .

# Production Image
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
            `.trim();
        }

        const dockerfilePath = path.join(workspacePath, 'Dockerfile');
        await fs.promises.writeFile(dockerfilePath, dockerfileContent);
        console.log(`[Build Engine] Generated Dockerfile for ${runtime} at ${dockerfilePath}`);
    }
    
    // Clone a remote repository to a temporary workspace
    private async cloneRepository(repoUrl: string, destinationPath: string): Promise<void> {
        const git = simpleGit();
        console.log(`[Build Engine] Cloning ${repoUrl} into ${destinationPath}`);
        await git.clone(repoUrl, destinationPath, ['--depth', '1']);
        console.log(`[Build Engine] Clone successful!`);
    }

    async processBuild(repoUrl: string): Promise<void> {
        // provision temporary workspace (Configurable)
        const baseDir = process.env.BUILD_WORKSPACE_DIR || os.tmpdir();
        const tempPrefix = path.join(baseDir, 'deployforge-build-');
        const workspacePath = await fs.promises.mkdtemp(tempPrefix);
        console.log(`[Build Engine] Provisioned temporary workspace at: ${workspacePath}`);

        try {
            // execute the clone
            await this.cloneRepository(repoUrl, workspacePath);

            // language detection
            const runtime = await this.detectLanguage(workspacePath);
            console.log(`[Build Engine] Detected runtime: ${runtime}`);

            // Dockerfile generation
            await this.generateDockerfile(runtime, workspacePath);

        } catch (error) {
                console.error(`[Build Engine] Build failed:`, error);
                throw error;
        } finally {
                // cleanup to prevent disk exhaustion
                await fs.promises.rm(workspacePath, {recursive: true, force: true});
                console.log(`[Build Engine] Cleaned up workspace: ${workspacePath}`);
        }
    }
}
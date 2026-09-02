import { simpleGit } from 'simple-git';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { spawn } from 'child_process';
import { strategies} from '../templates/buildStrategies.js'; //Import template store
import { RegistryService} from './registry.service.js';

//export type SupportedRuntime = 'NODEJS' | 'PYTHON' | 'GO';

export class BuildService {
    private registryService: RegistryService;

    constructor() {
        this.registryService = new RegistryService();
    }

    // Evaluate the repository against the template store
    private async applyBuildStrategy(workspacePath: string): Promise<void> {
        for (const strategy of strategies) {
            if (strategy.match(workspacePath)) {
                console.log(`[Build Engine] Matched build strategy: ${strategy.name}`);
                const dockerfileContent = strategy.generate(workspacePath);
                const dockerfilePath = path.join(workspacePath, 'Dockerfile');
                await fs.promises.writeFile(dockerfilePath, dockerfileContent);
                return;
            }
        }

        throw new Error('Unsupported repository structure: Could not match any build strategies.');
    }
    
    // Execute the Docker CLI to build the image
    private buildDockerImage(workspacePath: string, imageTag: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`[Build Engine] Starting Docker build for tag: ${imageTag}...`);

            //`docker build -t <imageTag> .`
            const dockerBuild = spawn('docker', ['build', '--progress=plain', '-t', imageTag, '.'], {
                cwd: workspacePath, // Run the command inside the temporary workspace
            });

            // Capture and print Docker's standard output (build logs)
            dockerBuild.stdout.on('data', (data) => {
                console.log(`[Docker Build] ${data.toString().trim()}`);
            });

            // docker error output
            dockerBuild.stderr.on('data', (data) => {
                console.error(`[Docker Build Progress] ${data.toString().trim()}`);
            });

            // Check command success
            dockerBuild.on('close', (code) => {
                if (code === 0) {
                    console.log(`[BUild Engine] Successfully built Docker image: ${imageTag}`);
                    resolve();
                } else {
                    reject(new Error(`Docker build failed with exit code ${code}`));
                }
            });
        });
    }

    // Clone a remote repository to a temporary workspace
    private async cloneRepository(repoUrl: string, destinationPath: string): Promise<void> {
        const git = simpleGit();
        console.log(`[Build Engine] Cloning ${repoUrl} into ${destinationPath}`);
        await git.clone(repoUrl, destinationPath, ['--depth', '1']);
        console.log(`[Build Engine] Clone successful!`);
    }

    async processBuild(repoUrl: string, buildId: string): Promise<void> {
        // provision temporary workspace (Configurable)
        const baseDir = process.env.BUILD_WORKSPACE_DIR || os.tmpdir();
        const tempPrefix = path.join(baseDir, 'deployforge-build-');
        const workspacePath = await fs.promises.mkdtemp(tempPrefix);
        console.log(`[Build Engine] Provisioned temporary workspace at: ${workspacePath}`);

        try {
            // execute the clone
            await this.cloneRepository(repoUrl, workspacePath);

            // apply build strategy
            await this.applyBuildStrategy(workspacePath);

            // Build docker image
            const imageTag = `deployforge-app:${buildId}`;
            await this.buildDockerImage(workspacePath, imageTag);

            //Push to registry service
            await this.registryService.pushImage(imageTag, buildId);

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
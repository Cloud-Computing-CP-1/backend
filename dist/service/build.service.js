import { simpleGit } from 'simple-git';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
export class BuildService {
    // Detect project language by checking for manifest files in the repo root
    async detectLanguage(workspacePath) {
        const hasPackageJson = fs.existsSync(path.join(workspacePath, 'package.json'));
        const hasRequirementsTxt = fs.existsSync(path.join(workspacePath, 'requirements.txt'));
        const hasGoMod = fs.existsSync(path.join(workspacePath, 'go.mod'));
        if (hasPackageJson)
            return 'NODEJS';
        if (hasRequirementsTxt)
            return 'PYTHON';
        if (hasGoMod)
            return 'GO';
        throw new Error('Unsupported repository structure: No package.json, requirements.txt, or go.mod found in root.');
    }
    // Clone a remote repository to a temporary workspace
    async cloneRepository(repoUrl, destinationPath) {
        const git = simpleGit();
        console.log(`[Build Engine] Cloning ${repoUrl} into ${destinationPath}`);
        await git.clone(repoUrl, destinationPath, ['--depth', '1']);
        console.log(`[Build Engine] Clone successful!`);
    }
    async processBuild(repoUrl) {
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
            return runtime;
        }
        catch (error) {
            console.error(`[Build Engine] Build failed:`, error);
            throw error;
        }
        finally {
            // cleanup to prevent disk exhaustion
            await fs.promises.rm(workspacePath, { recursive: true, force: true });
            console.log(`[Build Engine] Cleaned up workspace: ${workspacePath}`);
        }
    }
}
//# sourceMappingURL=build.service.js.map
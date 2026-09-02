import { spawn } from 'child_process';

export class RegistryService {
    private registryUrl: string;
    private namespace: string;

    constructor() {
        // falls back to empty string if not configure, allowing local-only builds
        this.registryUrl = process.env.REGISTRY_URL || '';
        this.namespace = 'deployforge-app'; //make dynamic per user later
    }

    //tag and push a local Docker image to the configured remote registry
    public pushImage(localTag: string, buildId: string): Promise<void> {
        if(!this.registryUrl) {
            console.log(`[Registry Service] No REGISTRY_URL CONFIGURED. Skipping image push.`);
            return Promise.resolve();
        }

        const remoteTag = `${this.registryUrl}/${this.namespace}:${buildId}`;

        return new Promise((resolve, reject) => {
            console.log(`[Registry Service] Tagging image for registry: ${remoteTag}`);
            const tagProcess = spawn('docker', ['tag', localTag, remoteTag]);

            tagProcess.on('close', (tagCode) => {
                if(tagCode !==0) return reject(new Error(`Docker tag failedwith code ${tagCode}`));

                console.log(`[Registry Service] Pushing image to remote registry...`);
                const pushProcess = spawn('docker', ['push', remoteTag]);

                pushProcess.stdout.on('data', (data) => console.log(`[Docker Push] ${data.toString().trim()}`));
                pushProcess.stderr.on('data', (data) => console.log(`[Docker Push Progress] ${data.toString().trim()}`));

                pushProcess.on('close', (pushCode) => {
                    if(pushCode === 0) {
                        console.log(`[Registry Service] Successfully pushed to ${remoteTag}`);
                        resolve();
                    } else {
                        reject(new Error(`Docker push failed with exit code ${pushCode}`));
                    }
                });
            });
        });
    }
}
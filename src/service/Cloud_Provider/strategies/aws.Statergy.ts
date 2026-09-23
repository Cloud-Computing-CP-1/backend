import type { CloudProviderStrategy, DeploymentResult, DeploymentInput } from "./CloudProviderStrategy.js";

export class AWSDeploymentStrategy implements CloudProviderStrategy {
    async deploy(input: DeploymentInput): Promise<DeploymentResult> {
        console.log(
            `Deploying project ${input.imageUri} to AWS`
        );
        // We will implement this next.
        return {
            status: "RUNNING",
        };
    }
    async stop(deploymentId: number): Promise<void> {
        console.log("Stopping AWS deployment:", deploymentId);
    }

    async delete(deploymentId: number): Promise<void> {
        console.log("Deleting AWS deployment:", deploymentId);
    }

    async getStatus(deploymentId: number): Promise<string> {
        return "RUNNING";
    }
}
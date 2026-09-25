import type { CloudProviderStrategy, DeploymentInput, DeploymentResult } from "./CloudProviderStrategy.js";

export class AzureDeploymentStrategy
    implements CloudProviderStrategy {

    async deploy(input: DeploymentInput): Promise<DeploymentResult> {
        throw new Error("Azure deployment not implemented");
    }

    async stop(id: number) { }
    async delete(id: number) { }

    async getStatus(id: number) {
        return "NOT_IMPLEMENTED";
    }
}   
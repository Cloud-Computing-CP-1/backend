import type { CloudProviderStrategy, Deployment_update_Input, Deployment_updateResult, DeploymentInput, DeploymentResult } from "./CloudProviderStrategy.js";

export class GCPDeploymentStrategy
    implements CloudProviderStrategy {

    async deploy(input: DeploymentInput): Promise<DeploymentResult> {
        throw new Error("GCP deployment not implemented");
    }

    async update(input: Deployment_update_Input):Promise<Deployment_updateResult> { 
         throw new Error("GCP deployment not implemented");
    }
    async delete(id: number) { }

    async getStatus(id: number) {
        return "NOT_IMPLEMENTED";
    }
}   
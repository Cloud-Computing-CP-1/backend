import type { CloudProviderStrategy, DeploymentResult, DeploymentInput } from "./CloudProviderStrategy.js";
import { AWSDeploymentService } from "../../AWSDeploymentService/AWSDeploymentService.js"
export class AWSDeploymentStrategy implements CloudProviderStrategy {
    private awsDeployement!: AWSDeploymentService
    constructor(awsDeploymentService: AWSDeploymentService) {
        this.awsDeployement = awsDeploymentService
    }
    async deploy(input: DeploymentInput): Promise<DeploymentResult> {
        return await this.awsDeployement.deploy(input)
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
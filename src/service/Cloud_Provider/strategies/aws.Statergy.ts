import type { CloudProviderStrategy, DeploymentResult, DeploymentInput, Deployment_update_Input, Deployment_updateResult } from "./CloudProviderStrategy.js";
import { AWSDeploymentService } from "../../AWSDeploymentService/AWSDeploymentService.js"
export class AWSDeploymentStrategy implements CloudProviderStrategy {
    private awsDeployement!: AWSDeploymentService
    constructor(awsDeploymentService: AWSDeploymentService) {
        this.awsDeployement = awsDeploymentService
    }
    async deploy(input: DeploymentInput): Promise<DeploymentResult> {
        return await this.awsDeployement.deploy(input)
    }
    async update(input:Deployment_update_Input): Promise<Deployment_updateResult> {
        return await this.awsDeployement.update(input)
    }

    async delete(deploymentId: number): Promise<void> {
        console.log("Deleting AWS deployment:", deploymentId);
    }

    async getStatus(deploymentId: number): Promise<string> {
        return "RUNNING"
    }
}
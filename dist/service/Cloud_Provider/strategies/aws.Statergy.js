import { AWSDeploymentService } from "../../AWSDeploymentService/AWSDeploymentService.js";
export class AWSDeploymentStrategy {
    awsDeployement;
    constructor(awsDeploymentService) {
        this.awsDeployement = awsDeploymentService;
    }
    async deploy(input) {
        return await this.awsDeployement.deploy(input);
    }
    async stop(deploymentId) {
        console.log("Stopping AWS deployment:", deploymentId);
    }
    async delete(deploymentId) {
        console.log("Deleting AWS deployment:", deploymentId);
    }
    async getStatus(deploymentId) {
        return "RUNNING";
    }
}
//# sourceMappingURL=aws.Statergy.js.map
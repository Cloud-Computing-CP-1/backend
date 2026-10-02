import type { CloudProviderStrategy, DeploymentResult, DeploymentInput, Deployment_update_Input, Deployment_updateResult } from "./CloudProviderStrategy.js";
import { AWSDeploymentService } from "../../AWSDeploymentService/AWSDeploymentService.js";
export declare class AWSDeploymentStrategy implements CloudProviderStrategy {
    private awsDeployement;
    constructor(awsDeploymentService: AWSDeploymentService);
    deploy(input: DeploymentInput): Promise<DeploymentResult>;
    update(input: Deployment_update_Input): Promise<Deployment_updateResult>;
    delete(deploymentId: number): Promise<void>;
    getStatus(deploymentId: number): Promise<string>;
}
//# sourceMappingURL=aws.Statergy.d.ts.map
import type { CloudProviderStrategy, DeploymentResult, DeploymentInput } from "./CloudProviderStrategy.js";
import { AWSDeploymentService } from "../../AWSDeploymentService/AWSDeploymentService.js";
export declare class AWSDeploymentStrategy implements CloudProviderStrategy {
    private awsDeployement;
    constructor(awsDeploymentService: AWSDeploymentService);
    deploy(input: DeploymentInput): Promise<DeploymentResult>;
    stop(deploymentId: number): Promise<void>;
    delete(deploymentId: number): Promise<void>;
    getStatus(deploymentId: number): Promise<string>;
}
//# sourceMappingURL=aws.Statergy.d.ts.map
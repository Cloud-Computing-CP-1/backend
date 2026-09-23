import type { CloudProviderStrategy, DeploymentResult, DeploymentInput } from "./CloudProviderStrategy.js";
export declare class AWSDeploymentStrategy implements CloudProviderStrategy {
    deploy(input: DeploymentInput): Promise<DeploymentResult>;
    stop(deploymentId: number): Promise<void>;
    delete(deploymentId: number): Promise<void>;
    getStatus(deploymentId: number): Promise<string>;
}
//# sourceMappingURL=aws.Statergy.d.ts.map
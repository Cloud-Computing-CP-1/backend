import type { CloudProviderStrategy, Deployment_update_Input, Deployment_updateResult, DeploymentInput, DeploymentResult } from "./CloudProviderStrategy.js";
export declare class AzureDeploymentStrategy implements CloudProviderStrategy {
    deploy(input: DeploymentInput): Promise<DeploymentResult>;
    update(input: Deployment_update_Input): Promise<Deployment_updateResult>;
    delete(id: number): Promise<void>;
    getStatus(id: number): Promise<string>;
}
//# sourceMappingURL=Azure.Statergy.d.ts.map
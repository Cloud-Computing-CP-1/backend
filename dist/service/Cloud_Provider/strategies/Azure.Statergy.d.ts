import type { CloudProviderStrategy, DeploymentInput, DeploymentResult } from "./CloudProviderStrategy.js";
export declare class AzureDeploymentStrategy implements CloudProviderStrategy {
    deploy(input: DeploymentInput): Promise<DeploymentResult>;
    stop(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    getStatus(id: number): Promise<string>;
}
//# sourceMappingURL=Azure.Statergy.d.ts.map
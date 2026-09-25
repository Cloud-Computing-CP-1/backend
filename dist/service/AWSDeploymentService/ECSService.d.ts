import type { DeploymentInput } from "../Cloud_Provider/strategies/CloudProviderStrategy.js";
export declare class ECSService {
    registerTaskDefinition(input: DeploymentInput): Promise<string>;
    createService(input: DeploymentInput, TargetGroupArn: string, taskDefinitionArn: string): Promise<string>;
    updateService(): Promise<void>;
    waitUntilHealthy(): Promise<void>;
}
//# sourceMappingURL=ECSService.d.ts.map
import type { DeploymentInput } from "../Cloud_Provider/strategies/CloudProviderStrategy.js";
export declare class AWSDeploymentService {
    private ecsService;
    private albService;
    deploy(input: DeploymentInput): Promise<{
        status: "RUNNING";
        providerResourceId: string;
        providerMetadata: {
            taskDefinition: string;
            targetGroup: string;
            ruleArn: string;
            serviceName: string;
        };
        deploymentUrl: string;
        hostname: string;
    }>;
}
//# sourceMappingURL=AWSDeploymentService.d.ts.map
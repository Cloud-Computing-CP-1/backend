import type { Deployment_update_Input, Deployment_updateResult, DeploymentInput } from "../Cloud_Provider/strategies/CloudProviderStrategy.js";
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
    update(input: Deployment_update_Input): Promise<Deployment_updateResult>;
}
//# sourceMappingURL=AWSDeploymentService.d.ts.map
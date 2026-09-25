import type { DeploymentInput } from "../Cloud_Provider/strategies/CloudProviderStrategy.js";
export declare class ALBService {
    createTargetGroup(input: DeploymentInput): Promise<string>;
    createListenerRule(projectId: string | string[] | undefined, projectSlug: string, targetGroupArn: string): Promise<{
        ruleArn: string;
        hostname: string;
        deploymentUrl: string;
    }>;
    deleteTargetGroup(): Promise<void>;
}
//# sourceMappingURL=ALBService.d.ts.map
import type { DeploymentInput } from "../Cloud_Provider/strategies/CloudProviderStrategy.js";
export declare class AWSDeploymentService {
    private ecsService;
    private albService;
    deploy(input: DeploymentInput): Promise<{
        status: "RUNNING";
    }>;
}
//# sourceMappingURL=AWSDeploymentService.d.ts.map
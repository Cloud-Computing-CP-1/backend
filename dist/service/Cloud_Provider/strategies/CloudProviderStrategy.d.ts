export interface DeploymentInput {
    imageUri: string | any;
    project_id: string | undefined | string[];
    contariner_port: number;
    env: {
        name: string;
        value: string;
    }[];
}
export interface DeploymentResult {
    status: "RUNNING" | "FAILED";
    deploymentUrl?: string;
    hostname?: string;
    providerResourceId?: string;
    providerMetadata?: {
        taskDefinition?: string;
        targetGroup?: string;
        ruleArn?: string;
        serviceName?: string;
        serviceArn?: string;
    };
}
export interface CloudProviderStrategy {
    deploy(input: DeploymentInput): Promise<DeploymentResult>;
    stop(deploymentId: number): Promise<void>;
    delete(deploymentId: number): Promise<void>;
    getStatus(deploymentId: number): Promise<string>;
}
//# sourceMappingURL=CloudProviderStrategy.d.ts.map
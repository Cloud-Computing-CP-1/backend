export interface DeploymentInput {
    imageUri: string | any;
    project_id: string | undefined | string[],
    contariner_port: number
    env: { name: string; value: string }[]
}
export interface Deployment_update_Input {
    imageUri: string | any;
    project_id: string | undefined | string[],
    contariner_port: number,
    ServiceName: string
    env: { name: string; value: string }[]
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
export interface Deployment_updateResult {
    taskDefinition?: string;
    serviceArn?: string;
}

export interface CloudProviderStrategy {
    deploy(
        input: DeploymentInput
    ): Promise<DeploymentResult>;

    update(
        Deployment_update_data: Deployment_update_Input
    ): Promise<Deployment_updateResult>;

    delete(
        deploymentId: number
    ): Promise<void>;

    getStatus(
        deploymentId: number
    ): Promise<string>;
}
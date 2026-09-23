export interface DeploymentInput {
    imageUri: string | any;
    project_id: string | undefined | string[],
    contariner_port: number
    env: { name: string; value: string }[]
}

export interface DeploymentResult {
    status: "RUNNING" | "FAILED";
    endpointUrl?: string;
    providerResourceId?: string;
    providerMetadata?: Record<string, unknown>;
}


export interface CloudProviderStrategy {
    deploy(
        input: DeploymentInput
    ): Promise<DeploymentResult>;

    stop(
        deploymentId: number
    ): Promise<void>;

    delete(
        deploymentId: number
    ): Promise<void>;

    getStatus(
        deploymentId: number
    ): Promise<string>;
}
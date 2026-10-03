export declare const create_deployment_history: (deployment_instance_id: string, project_id: string | string[], image_id: string, cloud_provider_name: string, task_definition: string) => Promise<void>;
export declare const get_deployment_history_get_all: () => Promise<any[]>;
export declare const get_deployment_history_by_project: (projectId: string | string[] | undefined) => Promise<any[]>;
export declare const Update_deployement_history: (id: string, taskDefinition: string) => Promise<void>;
//# sourceMappingURL=project.history.d.ts.map
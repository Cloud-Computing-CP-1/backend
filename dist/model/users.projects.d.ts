export declare const CreateProject: (user_id: number, github_accounts_id: number, projects_name: string, repo_name: string, repo_owner: string, repo_email: string, repo_id: number, branch: string, cloud_provider: string) => Promise<any>;
export declare const getAllProject: () => Promise<any[]>;
export declare const findProjectUpdatecurrimage: (image_id: string, project_id: string) => Promise<any[]>;
export declare const getCurrentimageRuning_: (project_id: string | string[] | undefined) => Promise<any>;
export declare const AddEnvto_DB: (project_id: string | string[] | undefined, obj: Object) => Promise<void>;
export declare const getProjectEnv: (project_id: string | string[] | undefined) => Promise<any[]>;
//# sourceMappingURL=users.projects.d.ts.map
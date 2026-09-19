export interface Project {
    id: number;

    user_id: number;
    github_account_id: number;

    repo_id: number;
    repo_name: string;
    repo_owner: string;
    branch: string;

    current_image_id: number | null;

    project_name: string;

    status:
        | "PENDING"
        | "BUILDING"
        | "DEPLOYING"
        | "RUNNING"
        | "FAILED"
        | "STOPPED";


}
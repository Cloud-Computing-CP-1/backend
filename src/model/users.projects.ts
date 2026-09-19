import pool from "../config/postgresDb.js";

export const CreateProject = async (
    user_id: number,
    github_accounts_id: number,
    projects_name: string,
    repo_name: string,
    repo_owner: string,
    repo_email: string,
    repo_id: number,
    branch: string,
    cloud_provider: string
) => {

    const result = await pool.query(
        `INSERT INTO projects(
            user_id,
            github_accounts_id,
            projects_name,
            repo_name,
            repo_owner,
            repo_email,
            repo_id,
            branch,
            cloud_provider
        )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id`,
        [
            user_id,
            github_accounts_id,
            projects_name,
            repo_name,
            repo_owner,
            repo_email,
            repo_id,
            branch,
            cloud_provider
        ]
    );

    return result.rows[0];
};

export const getAllProject = async()=>{
    const result = await pool.query(
        `select * from projects`
    )
    return result.rows;
}
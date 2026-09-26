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

export const getAllProject = async () => {
    const result = await pool.query(
        `select * from projects`
    )
    return result.rows;
}
export const get__Project_name = async (project_id:string|string[]|undefined) => {
    const result = await pool.query(
        `select projects_name from projects where id=$1 `,[project_id]
    )
    return result.rows[0];
}

export const findProjectUpdatecurrimage = async (image_id: string, project_id: string) => {
    const result = await pool.query(
        `UPDATE  projects 
         SET  current_image_id=$1 
         WHERE id = $2
         RETURNING id`,
        [image_id, project_id]
    )
    return result.rows
}

export const getCurrentimageRuning_ = async (project_id: string | string[] | undefined) => {
    const result = await pool.query(
        `select * from deployed_image where id = ( select current_image_id from projects where id=$1)`,
        [project_id]
    )
    return result.rows[0]
}
export const AddEnvto_DB = async (project_id: string | string[] | undefined, obj: Object) => {
    for (let [key, val] of Object.entries(obj)) {
        await pool.query(
            `INSERT INTO project_env_vars (project_id, key, value)
         VALUES ($1, $2, $3)
         ON CONFLICT (project_id, key)
         DO UPDATE SET value = EXCLUDED.value,
                       updated_at = NOW()`,
            [project_id, key, val]
        )
    }
}

export const getProjectEnv = async (project_id: string | string[] | undefined) => {
    const result = await pool.query(
        `SELECT key, value
         FROM project_env_vars
         WHERE project_id = $1`,
        [project_id]
    );

    return result.rows;
};
    export const update_url = async (project_id: string | string[] | undefined,url:string | undefined,status:string,providername:string) => {
         await pool.query(
            `UPDATE projects 
            set deployment_url=$2, statuss=$3, cloud_provider=$4 where id=$1`,
            [project_id,url,status,providername]
        );
    };

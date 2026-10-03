import pool from "../config/postgresDb.js";

export const create_deployment_history = async (
    deployment_instance_id: string,
    project_id: string | string[],
    image_id: string,
    cloud_provider_name: string,
    task_definition: string
) => {
    await pool.query(
        `INSERT INTO deployment_instence_history (
      deployment_instance_id,
      project_id,
      image_id,
      cloud_provider_name,
      task_definition
    ) VALUES ($1, $2, $3, $4, $5)`,
        [
            deployment_instance_id,
            project_id,
            image_id,
            cloud_provider_name,
            task_definition
        ]
    );
};


// export const get_deployment_history_by_project = async(project_id:string)=>{
//     const result = await pool.query(
//         `select * from where project_id=$1`
//     )
// }
export const get_deployment_history_get_all = async () => {
    const result = await pool.query(`
        SELECT
            *
        FROM deployment_instence_history dih
        JOIN deployed_image di
            ON dih.image_id = di.id
    `);
    return result.rows;
};



export const get_deployment_history_by_project = async (
    projectId: string | string[] | undefined
) => {
    const result = await pool.query(
        ` select *
             from deployment_instence_history  dih
             join deployed_image di
                on dih.image_id = di.id
             WHERE dih.project_id = $1
        `, [projectId]
    )
    return result.rows
}

export const Update_deployement_history = async (id: string, taskDefinition: string) => {
    await pool.query(
        `UPDATE deployment_instence_history
         SET task_definition = $1, status = 'RUNNING' 
         WHERE id = $2`,
        [taskDefinition, id]
    );
};
import pool from "../config/postgresDb.js";

export const CreateDeploymentInstance = async (
    data:any
) => {

    const result = await pool.query(
        `
        INSERT INTO deployment_instances (
            project_id,
            image_id,
            cloud_provider,
            region,
            provider_service,
            status,
            hostname,
            deployment_url,
            provider_resource_id,
            provider_metadata
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *
        `,
        [
            data.project_id,
            data.image_id,
            data.cloud_provider,
            data.region,
            data.provider_service,
            data.status,
            data.hostname,
            data.deployment_url,
            data.provider_resource_id,
            JSON.stringify(data.provider_metadata)
        ]
    );

    return result.rows[0];
};

export const get_all_deployment_instace = async(id:string|string[]|undefined)=>{
    const result = await pool.query(
        `select * from deployment_instances where project_id=$1`,[id]
    )
    return result.rows
}
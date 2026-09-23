import pool from "../config/postgresDb.js";

export const getAllCloude_Provider = async () => {
    const result = await pool.query(
        ` select * from cloud_providers order by id`
    )
    return result.rows
}
export const stop_Provider_db = async (id: string | undefined | string[], is_enable: boolean) => {
    const result = await pool.query(
        ` update cloud_providers
        set is_enabled=$2 where id=$1`,
        [id, is_enable]
    )
    return result.rows
}
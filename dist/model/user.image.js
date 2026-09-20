import pool from "../config/postgresDb.js";
export const CreateImage = async (project_id, repo_id, repo_url, repo_branch, image_url, image_digest, image_tags, status_, build_start_at, build_completed_at) => {
    const result = await pool.query(`INSERT INTO deployed_image(
        project_id,
        repo_id,
        repo_url,
        branch,
        image_uri,
        image_digest,
        image_tags,
        status_,
        build_start_at,
        build_completed_at
        )
    values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING id `, [
        project_id,
        repo_id,
        repo_url,
        repo_branch,
        image_url,
        image_digest,
        image_tags,
        status_,
        build_start_at,
        build_completed_at
    ]);
    return result.rows[0];
};
export const getimagesproject = async (project_id) => {
    const result = await pool.query(`SELECT * FROM deployed_image WHERE project_id=$1`, [project_id]);
    return result.rows;
};
//# sourceMappingURL=user.image.js.map
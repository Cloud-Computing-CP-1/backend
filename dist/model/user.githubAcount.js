import pool from "../config/postgresDb.js";
export const GithubAcountCreate = async (user_from_Github) => {
    const result = await pool.query(`INSERT INTO github_accounts(user_id,github_id,username,avatar_url,access_token_encrypted)
         values($1,$2,$3,$4,$5)
         RETURNING id,user_id,username,github_id,avatar_url, access_token_encrypted`, [user_from_Github.user_id, user_from_Github.github_id, user_from_Github.username, user_from_Github.avatar_url, user_from_Github.access_token_encrypted]);
    return result.rows[0];
};
export const getGithubAccountAccesTokenById = async (id) => {
    const result = await pool.query(`SELECT access_token_encrypted FROM github_accounts WHERE  user_id=$1 `, [id]);
    return result.rows[0];
};
export const UpdateAcessTokenOfUser = async (id, AcessToken) => {
    await pool.query(`UPDATE github_accounts SET access_token_encrypted= $2 WHERE user_id=$1`, [id, AcessToken]);
};
//# sourceMappingURL=user.githubAcount.js.map
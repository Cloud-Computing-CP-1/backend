import pool from "../config/postgresDb.js";
export const findByEmail = async (ClientEmail) => {
    const result = await pool.query(`SELECT id, email, username FROM users WHERE email = $1
        `, [ClientEmail]);
    return result.rows[0] || null;
};
export const Create = async (userdata) => {
    const result = await pool.query(`INSERT INTO users(username,email)
        VALUES ($1,$2)
        RETURNING id,username,email
        `, [userdata.username, userdata.email]);
    return result.rows[0];
};
//# sourceMappingURL=user.model.js.map
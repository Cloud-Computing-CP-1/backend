import fs from "fs";
import path from "path";
import pool from "../config/postgresDb.js";
async function migrate() {
    try {
        // Create migration tracking table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
        const migrationsPath = path.join(process.cwd(), "migrations");
        const files = fs
            .readdirSync(migrationsPath)
            .filter((file) => file.endsWith(".sql"))
            .sort();
        for (const file of files) {
            // Check whether migration already ran
            const result = await pool.query(`SELECT id FROM migrations WHERE name = $1`, [file]);
            if (result.rows.length > 0) {
                console.log(`Already executed: ${file}`);
                continue;
            }
            console.log(`Running: ${file}`);
            const sql = fs.readFileSync(path.join(migrationsPath, file), "utf-8");
            await pool.query("BEGIN");
            try {
                await pool.query(sql);
                await pool.query(`INSERT INTO migrations (name) VALUES ($1)`, [file]);
                await pool.query("COMMIT");
                console.log(`Completed: ${file}`);
            }
            catch (error) {
                await pool.query("ROLLBACK");
                throw error;
            }
        }
        console.log("All migrations completed");
    }
    catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
    finally {
        await pool.end();
    }
}
migrate();
//# sourceMappingURL=migrate.js.map
import fs from "fs";
import path from "path";
import pool from "../config/postgresDb.js";
const legacyMigrationNames = {
    "002_create_github_accounts.sql": ["002.create.github_accounts.sql"],
    "003_create_projects.sql": ["005.create_project.sql"],
    "004_add_unique_user_repository.sql": ["005.update_projects.sql"],
    "005_drop_unique_user_repository.sql": ["006.update_project.sql"],
    "006_create_deployed_images.sql": ["003.cretae.image.sql"],
    "007_add_project_image_foreign_key.sql": ["006.update_project_table.sql"],
    "008_create_project_env_vars.sql": ["007.create.env.sql"],
    "009_create_legacy_deployment_instance.sql": ["008.create.deployment_instance.sql"],
    "010_create_cloud_providers.sql": ["009.create.cloude_provider.sql"],
    "011_seed_cloud_providers.sql": ["010.insert.data.sql"],
    "012_make_username_nullable.sql": ["011.update.user.sql"],
    "013_add_legacy_deployment_provider.sql": ["011.update_deployment_instance.sql"],
    "014_create_deployment_instances.sql": ["013.delete-deployment.sql"],
    "015_ensure_deployment_instances.sql": ["015.create.deployment_instance.sql"],
    "016_create_legacy_deployment_history.sql": ["016.create.deployment_history.sql"],
    "017_create_deployment_history.sql": ["017.create_history.sql"],
};
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
            const knownNames = [file, ...(legacyMigrationNames[file] ?? [])];
            const result = await pool.query(`SELECT id FROM migrations WHERE name = ANY($1::text[])`, [knownNames]);
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
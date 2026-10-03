CREATE TABLE IF NOT EXISTS deployment_instence_history (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    deployment_instance_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    image_id BIGINT NOT NULL,
    cloud_provider_name VARCHAR(89) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'DEPLOYING',
    task_definition TEXT,
    CONSTRAINT check_status CHECK (status IN ('DEPLOYING', 'RUNNING', 'FAILED', 'STOPPED')),
    CONSTRAINT fk_project_id FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_image_id FOREIGN KEY(image_id) REFERENCES deployed_image(id) ON DELETE CASCADE,
    CONSTRAINT fk_deployment_instance_id FOREIGN KEY(deployment_instance_id) REFERENCES deployement_instance(id) ON DELETE CASCADE
)
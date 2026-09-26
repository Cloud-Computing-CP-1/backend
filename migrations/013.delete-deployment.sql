CREATE TABLE IF NOT EXISTS deployment_instances (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    project_id BIGINT NOT NULL,
    image_id BIGINT NOT NULL,

    cloud_provider VARCHAR(70) NOT NULL,
    region VARCHAR(240) NOT NULL,

    provider_service VARCHAR(100),

    status VARCHAR(70) NOT NULL DEFAULT 'PENDING',

    -- Public application information
    hostname VARCHAR(255),
    deployment_url TEXT,

    -- Main cloud resource identifier
    provider_resource_id TEXT,

    -- Provider-specific resources
    provider_metadata JSONB DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_deployment_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_deployment_image
        FOREIGN KEY (image_id)
        REFERENCES deployed_image(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_cloud_provider
        CHECK (
            cloud_provider IN ('AWS', 'GCP', 'AZURE')
        ),

    CONSTRAINT chk_deployment_status
        CHECK (
            status IN (
                'PENDING',
                'DEPLOYING',
                'RUNNING',
                'FAILED',
                'STOPPED'
            )
        )
);
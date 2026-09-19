CREATE TABLE IF NOT EXISTS deployed_image (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    -- Connected project
    project_id BIGINT NOT NULL,

    -- Repository information
    repo_id BIGINT NOT NULL,
    repo_url VARCHAR(255) NOT NULL,
    branch VARCHAR(255) NOT NULL,

    -- Image information
    image_uri TEXT,
    image_digest VARCHAR(255),
    image_tags VARCHAR(255),

    status_ VARCHAR(30) NOT NULL DEFAULT 'PENDING',

    -- Timestamps
    build_start_at TIMESTAMPTZ,
    build_completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_build_image_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_build_image_status
        CHECK (
            status_ IN (
                'PENDING',
                'BUILDING',
                'READY',
                'FAILED'
            )
        )
);
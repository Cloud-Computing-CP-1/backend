CREATE TABLE IF NOT EXISTS projects(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY key,
    -- Project information
    projects_name VARCHAR(255) NOT NULL,
    -------- owernerShipe
    user_id BIGINT NOT NULL,
    github_accounts_id BIGINT NOT NULL,
    --- repository
    repo_id BIGINT NOT NULL,
    repo_name VARCHAR(255) NOT NULL,
    repo_owner VARCHAR(255) NOT NULL,
    repo_email VARCHAR(255) NOT NULL,
    branch VARCHAR(70) NOT NULL,

    ----- current_Deployed_image
    current_image_id BIGINT,

    ---- status_dEployment
    deployment_url TEXT,
    statusS VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    Cloud_provider VARCHAR(50) NOT NULL,

    ---  timespams
    created_at TIMESTAMPTZ not NULL DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMPTZ not NULL DEFAULT CURRENT_TIMESTAMP, 
    --- contraints

    CONSTRAINT fk_project_user
    FOREIGN key(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_with_github_table
    FOREIGN  KEY (github_accounts_id) REFERENCES github_accounts(id) ON DELETE CASCADE,
    CONSTRAINT chk_project_status
      CHECK (
        statusS IN (
            'PENDING',
                'BUILDING',
                'DEPLOYING',
                'RUNNING',
                'FAILED',
                'STOPPED'
        )
      )

)
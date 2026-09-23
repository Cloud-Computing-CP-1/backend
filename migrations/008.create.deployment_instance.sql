CREATE TABLE IF NOT EXISTS deployement_instance (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id BIGINT NOT NULL,
    image_id BIGINT NOT NULL,
    cloud_provider varchar(70) not NULL,
    region varchar(240) not null,
    provider_service VARCHAR(50),
    status_ varchar(70) not null default 'PENDING',
      provider_resource_id TEXT,
          FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,
   FOREIGN KEY (image_id)
        REFERENCES deployed_image(id)
        ON DELETE RESTRICT,     

    CHECK (
        cloud_provider IN ('AWS', 'GCP', 'AZURE')
    ),
        CHECK (
        status_ IN (
            'PENDING',
            'DEPLOYING',
            'RUNNING',
            'FAILED',
            'STOPPED'
        )
    )

)
alter table deployement_instance
add provider_id bigint not null,
ADD CONSTRAINT fk_deployment_instance_provider 
FOREIGN key(provider_id) REFERENCES cloud_providers(id) on DELETE CASCADE
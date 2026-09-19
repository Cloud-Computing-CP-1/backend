ALTER TABLE projects 
ADD CONSTRAINT fk_image_id
FOREIGN key(current_image_id) REFERENCES deployed_image(id) on DELETE SET NULL;
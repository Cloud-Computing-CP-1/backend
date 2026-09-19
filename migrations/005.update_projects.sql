ALTER TABLE projects
ADD CONSTRAINT unique_user_repository
UNIQUE (user_id, repo_id);
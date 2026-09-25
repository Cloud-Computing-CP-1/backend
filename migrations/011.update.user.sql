ALTER TABLE users
ALTER COLUMN username DROP NOT NULL;

UPDATE users
SET username = NULL;
CREATE TABLE user (id SERIAL NOT NULL PRIMARY KEY , username varchar(255) NOT NULL, "email" varchar(255) NOT NULL, role varchar(255) NOT NULL DEFAULT 'user', password varchar(255) NOT NULL);
--
-- Create model Project
--
CREATE TABLE project (
    id SERIAL NOT NULL PRIMARY KEY AUTOINCREMENT, 
    title varchar(255) NOT NULL, 
    description text NOT NULL, "assigned" bool NULL, "completed" bool NULL, 
endDate date NOT NULL, assigned_to bigint NOT NULL REFERENCES api_user (id) DEFERRABLE INITIALLY DEFERRED);
  








CREATE TABLE IF NOT EXISTS projects
(
    project_id uuid NOT NULL DEFAULT PRIMARY KEY uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL ,
    due_at DATE NOT NULL,
    completed VARCHAR(255) DEFAULT 'no',
    assigned_to uuid REFERENCES user(user_id)
)



SELECT *
FROM project
INNER JOIN users
ON project.assigned_to = users.user_id;

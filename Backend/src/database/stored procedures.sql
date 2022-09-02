-- procedure to get all users 
create or replace procedure GetUsers ()
as 
$$
  begin
      select * from users;
  end;
$$
language plpgsql;
-- end of procedure to get all users 


-- procedure to register users 
create or replace procedure RegisterUsers (user_name VARCHAR(255),user_email VARCHAR(255), user_pass VARCHAR(255))
as 
$$
  begin
      insert into users(username, email, password) values(user_name, user_email, user_pass);
  end;
$$
language plpgsql;
--end of  procedure to register users 


-- procedure to check if user is assigned a project 
create or replace procedure checkAssignedProject (user_name VARCHAR(255))
as 
$$
  begin
      select assigned_project  from users where  username =user_name;
  end;
$$
language plpgsql;
-- end of procedure to check if user is assigned a project 




create or replace procedure InsertProject(tit character varying(255) NOT NULL , descr character varying(255) NOT NULL, due date NOT NULL, assig uuid)
as
$$
  begin 
     INSERT INTO project(title, description, due_at, assigned_to) VALUES (tit, descr,due, assig );
	 
  end;
$$
language plpgsql;
  
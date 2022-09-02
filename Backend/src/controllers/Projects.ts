import { Request, Response } from "express";
import pool from "../database/config.js";

interface ExtendedRequest extends Request {
  body: {
    title: string;
    description: string;
    due_at: string;
    assigned_to: string;
  };
}

export const insertProject = async (req: ExtendedRequest, res: Response) => {
  try {
    const { title, description, due_at, assigned_to } = req.body;
    console.log(req.body);

    let user_asigned = await pool.query(
      `SELECT user_id FROM users where username = '${assigned_to}' AND assigned_project ='no' `
    );
    user_asigned = user_asigned.rows[0].user_id;
    // console.log(user_asigned.user_id);

    const newProject = await pool.query(
      `INSERT INTO project(title, description, due_at, assigned_to) VALUES('${title}', '${description}', '${due_at}', '${user_asigned}')`
    );

    res.json({
      message: "You have Added project Successfully",
    });
    await pool.query(
      `UPDATE users SET assigned_project='yes' WHERE user_id='${user_asigned}'`
    );
  } catch (error) {
    res.json({
      message: "User is already Assigned a project.",
    });
    console.log(error);
  }
};

export const getProjects = async (req: ExtendedRequest, res: Response) => {
  try {
    let projects = await pool.query(
      "SELECT project_id, project.title, project.description, project.due_at, project.completed ,users.username FROM project INNER JOIN users ON  users.user_id = project.assigned_to;"
    );

    projects = projects.rows;
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const getSingleProject = async (req: ExtendedRequest, res: Response) => {
  try {
    const proj_id = req.params.id;
    let singleProject = await pool.query(
      `SELECT * FROM project WHERE project_id = '${proj_id}'`
    );
    singleProject = singleProject.rows[0];
    res.json({
      singleProject,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = async (req: ExtendedRequest, res: Response) => {
  try {
    const updateId = req.params.id;
    const { title, description, due_at, assigned_to } = req.body;
    let user_updated = await pool.query(
      `SELECT user_id FROM users where username = '${assigned_to}'`
    );
    user_updated = user_updated.rows[0].user_id;
    const newupdate = await pool.query(
      `UPDATE project SET title ='${title}' ,description ='${description}', due_at ='${due_at}', assigned_to ='${user_updated}' WHERE project_id='${updateId}' `
    );

    res.json({
      message: "You have updated project Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = req.params.id;
    // console.log(id);

    let user_id = await pool.query(
      `SELECT * FROM project WHERE project_id='${id}'`
    );
    user_id = user_id.rows[0].assigned_to;
    console.log(user_id);

    await pool.query(
      `UPDATE users SET assigned_project='no' WHERE user_id='${user_id}'`
    );
    await pool.query(`DELETE FROM project WHERE project_id='${id}'`);
    res.json({
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsComplete = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = req.params.id;

    let user_id = await pool.query(
      `SELECT * FROM project WHERE project_id='${id}'`
    );
    user_id = user_id.rows[0].assigned_to;
    await pool.query(
      `UPDATE project SET completed = 'true' WHERE assigned_to = '${user_id}'`
    );
    await pool.query(
      `UPDATE users SET assigned_project='no' WHERE user_id='${user_id}'`
    );
    res.json({
      message: "Project completed successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

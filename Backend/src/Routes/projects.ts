import { Router } from "express";
import { deleteProject, getProjects, getSingleProject, insertProject,  markAsComplete,  updateProject } from "../controllers/Projects.js";

const projectRouter = Router()


projectRouter.get("/", getProjects);
projectRouter.get("/singleproject/:id", getSingleProject);
projectRouter.post("/", insertProject); 
projectRouter.put("/update/:id", updateProject);
projectRouter.get("/:id", deleteProject);
projectRouter.get("/completed/:id", markAsComplete);

export default projectRouter;
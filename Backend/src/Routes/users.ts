import { Router } from "express";
import { getProjects } from "../controllers/Projects.js";
import { checkUser, getProject, getUsers, insertUser, LoginUser, logoutUser} from "../controllers/Users.js";
import { VerifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", getUsers);
router.post("/", insertUser);
router.post("/login", LoginUser);
router.get("/check", VerifyToken,checkUser);
router.get("/logout", logoutUser);
router.get("/project/:userId",getProject);




export default router;



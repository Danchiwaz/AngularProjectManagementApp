"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsComplete = exports.deleteProject = exports.updateProject = exports.getSingleProject = exports.getProjects = exports.insertProject = void 0;
const config_js_1 = __importDefault(require("../database/config.js"));
const insertProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, due_at, assigned_to } = req.body;
        console.log(req.body);
        let user_asigned = yield config_js_1.default.query(`SELECT user_id FROM users where username = '${assigned_to}' AND assigned_project ='no' `);
        user_asigned = user_asigned.rows[0].user_id;
        // console.log(user_asigned.user_id);
        const newProject = yield config_js_1.default.query(`INSERT INTO project(title, description, due_at, assigned_to) VALUES('${title}', '${description}', '${due_at}', '${user_asigned}')`);
        res.json({
            message: "You have Added project Successfully",
        });
        yield config_js_1.default.query(`UPDATE users SET assigned_project='yes' WHERE user_id='${user_asigned}'`);
    }
    catch (error) {
        res.json({
            message: "User is already Assigned a project.",
        });
        console.log(error);
    }
});
exports.insertProject = insertProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let projects = yield config_js_1.default.query("SELECT project_id, project.title, project.description, project.due_at, project.completed ,users.username FROM project INNER JOIN users ON  users.user_id = project.assigned_to;");
        projects = projects.rows;
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({
            error: error,
        });
    }
});
exports.getProjects = getProjects;
const getSingleProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proj_id = req.params.id;
        let singleProject = yield config_js_1.default.query(`SELECT * FROM project WHERE project_id = '${proj_id}'`);
        singleProject = singleProject.rows[0];
        res.json({
            singleProject,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleProject = getSingleProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateId = req.params.id;
        const { title, description, due_at, assigned_to } = req.body;
        let user_updated = yield config_js_1.default.query(`SELECT user_id FROM users where username = '${assigned_to}'`);
        user_updated = user_updated.rows[0].user_id;
        const newupdate = yield config_js_1.default.query(`UPDATE project SET title ='${title}' ,description ='${description}', due_at ='${due_at}', assigned_to ='${user_updated}' WHERE project_id='${updateId}' `);
        res.json({
            message: "You have updated project Successfully",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // console.log(id);
        let user_id = yield config_js_1.default.query(`SELECT * FROM project WHERE project_id='${id}'`);
        user_id = user_id.rows[0].assigned_to;
        console.log(user_id);
        yield config_js_1.default.query(`UPDATE users SET assigned_project='no' WHERE user_id='${user_id}'`);
        yield config_js_1.default.query(`DELETE FROM project WHERE project_id='${id}'`);
        res.json({
            message: "Project Deleted Successfully",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProject = deleteProject;
const markAsComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let user_id = yield config_js_1.default.query(`SELECT * FROM project WHERE project_id='${id}'`);
        user_id = user_id.rows[0].assigned_to;
        yield config_js_1.default.query(`UPDATE project SET completed = 'true' WHERE assigned_to = '${user_id}'`);
        yield config_js_1.default.query(`UPDATE users SET assigned_project='no' WHERE user_id='${user_id}'`);
        res.json({
            message: "Project completed successfully",
        });
    }
    catch (error) {
        res.json({
            error,
        });
    }
});
exports.markAsComplete = markAsComplete;

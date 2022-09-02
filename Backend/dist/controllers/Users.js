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
exports.getProject = exports.checkUser = exports.logoutUser = exports.LoginUser = exports.getUsers = exports.insertUser = void 0;
const config_js_1 = __importDefault(require("../database/config.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_helper_js_1 = require("../Helpers/jwt-helper.js");
const insertUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield config_js_1.default.query(`CALL RegisterUser($1, $2, $3)`, [
            username,
            email,
            hashedPassword,
        ]);
        res.json({
            message: "Registered successfully.Please Login",
        });
    }
    catch (error) {
        res.json({
            message: "Username or Email exists",
        });
    }
});
exports.insertUser = insertUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield config_js_1.default.query("select username from users where assigned_project ='no';");
        users = users.rows;
        res.json(users);
        // console.log(users);
    }
    catch (error) {
        res.status(500).json({
            error: error,
        });
    }
});
exports.getUsers = getUsers;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield config_js_1.default.query(`SELECT * FROM users WHERE username = '${username}'`);
        if (user.rows.length === 0)
            return res.status(403).json({ message: "username is incorrect" });
        const validPassword = yield bcrypt_1.default.compare(password, user.rows[0].password);
        if (!validPassword)
            return res.status(401).json({ message: "password is incorrect" });
        let token = (0, jwt_helper_js_1.jwtTokens)(user.rows[0]);
        let user_name = user.rows[0].username;
        let user_role = user.rows[0].role;
        let user_id = user.rows[0].user_id;
        res.json({
            token: token,
            username: user_name,
            role: user_role,
            user_id
        });
    }
    catch (error) {
        res.json({
            message: "Invalid credentials",
        });
    }
});
exports.LoginUser = LoginUser;
const logoutUser = (req, res) => {
    localStorage.removeItem("token");
};
exports.logoutUser = logoutUser;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        res.json({
            user_id: req.info.user_id,
            username: req.info.username,
            email: req.info.email,
            role: req.info.role,
        });
    }
});
exports.checkUser = checkUser;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        let project = yield config_js_1.default.query(`SELECT * FROM project WHERE assigned_to='${userId}'`);
        project = project.rows[0];
        res.json(project);
    }
    catch (error) {
        res.json({
            error: error,
        });
    }
});
exports.getProject = getProject;

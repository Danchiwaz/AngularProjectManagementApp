"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_js_1 = require("../controllers/Users.js");
const verifyToken_js_1 = require("../middleware/verifyToken.js");
const router = (0, express_1.Router)();
router.get("/", Users_js_1.getUsers);
router.post("/", Users_js_1.insertUser);
router.post("/login", Users_js_1.LoginUser);
router.get("/check", verifyToken_js_1.VerifyToken, Users_js_1.checkUser);
router.get("/logout", Users_js_1.logoutUser);
router.get("/project/:userId", Users_js_1.getProject);
exports.default = router;

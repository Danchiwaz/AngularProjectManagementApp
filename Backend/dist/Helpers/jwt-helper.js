"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const jwtTokens = ({ user_id, username, email, role }) => {
    const user = { user_id, username, email, role };
    const accessToken = jsonwebtoken_1.default.sign(user, process.env.USER_ACCESS_TOKEN, { expiresIn: "120m" });
    return accessToken;
};
exports.jwtTokens = jwtTokens;

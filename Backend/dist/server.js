"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projects_1 = __importDefault(require("./Routes/projects"));
const users_1 = __importDefault(require("./Routes/users"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = { credentials: true, origin: process.env.URL || '*' };
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
//  routes configuration 
app.use('/users', users_1.default);
app.use('/projects', projects_1.default);
// end or route configurations 
app.use((error, req, res, next) => {
    res.json({
        Error: error.message
    });
});
app.listen(5003, () => {
    console.log("Server is Listening to port 5003");
});

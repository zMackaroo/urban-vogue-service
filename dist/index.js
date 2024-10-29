"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Routes_1 = __importDefault(require("./Routes"));
const dbConnect_1 = require("./Utils/dbConnect");
const application = (0, express_1.default)();
dotenv_1.default.config();
application.use((0, cors_1.default)());
application.use(express_1.default.json());
application.use((0, cookie_parser_1.default)());
application.use(Routes_1.default);
application.listen(process.env.PORT, () => {
    console.log(`Development server is running on port ${process.env.PORT}`);
    (0, dbConnect_1.MongoDB)();
});

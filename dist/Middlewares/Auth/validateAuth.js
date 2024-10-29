"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateAuth = (request, response, next) => {
    const token = request.headers.accesstoken;
    if (!token)
        return response.status(401).json({ message: "Un-authorized" });
    const accessToken = token.split(" ")[1];
    jsonwebtoken_1.default.verify(accessToken, `${process.env.JWT_ACCESS_TOKEN_SECRET}`, (err, user) => {
        if (err) {
            return response
                .status(403)
                .json({ message: "Invalid authorization token" });
        }
        request.user = user;
        next();
    });
};
exports.validateAuth = validateAuth;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateRefreshToken = exports.GenerateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, `${process.env.JWT_ACCESS_TOKEN_SECRET}`, {
        expiresIn: 60000 * 120,
    });
};
exports.GenerateAccessToken = GenerateAccessToken;
const GenerateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(user, `${process.env.JWT_REFRESH_TOKEN_SECRET}`);
};
exports.GenerateRefreshToken = GenerateRefreshToken;

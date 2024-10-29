"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.logoutUser = logoutUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_helper_1 = require("../Utils/Helper/auth.helper");
let refreshTokens = [];
const mockUser = [{ id: 1, email: "admin@admin.com", password: "1234" }];
function getUser(request, response) {
    const { body: { email, password }, } = request;
    const findUser = mockUser.find((user) => user.email === email);
    if (!findUser || findUser.password !== password)
        return response.status(401).send({ message: "BAD CREDENTIALS" });
    const accessToken = (0, auth_helper_1.GenerateAccessToken)(findUser);
    const refreshToken = (0, auth_helper_1.GenerateRefreshToken)(findUser);
    refreshTokens.push(refreshToken);
    return response
        .status(200)
        .send({ email: findUser.email, accessToken, refreshToken });
}
function refreshToken(request, response) {
    const refreshToken = request.body.token;
    if (!refreshToken)
        return response.status(401).json("Un-authorized");
    if (!refreshTokens.includes(refreshToken)) {
        return response.status(403).json("Refresh token is not valid!");
    }
    jsonwebtoken_1.default.verify(refreshToken, `${process.env.JWT_REFRESH_TOKEN_SECRET}`, (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const findUser = mockUser.find((data) => data.email === user.email);
        const newAccessToken = (0, auth_helper_1.GenerateAccessToken)(findUser);
        const newRefreshToken = (0, auth_helper_1.GenerateRefreshToken)(findUser);
        refreshTokens.push(newRefreshToken);
        response.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
}
function logoutUser(request, response) {
    const refreshToken = request.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    response.status(200).json("You logged out successfully.");
}
function createUser(request, response) { }
function updateUser(request, response) { }
function deleteUser(request, response) { }

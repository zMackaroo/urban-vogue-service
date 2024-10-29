"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../Handlers/auth");
const router = (0, express_1.Router)();
// @Route: /auth
// @Method: POST
// @Protected: false
// @Use: Get Users from 'tbl_users'
router.post("/auth", auth_1.getUser);
// @Route: /auth/refresh
// @Method: POST
// @Protected: true
// @Use: Refresh token
router.post("/auth/refresh", auth_1.refreshToken);
// @Route: /auth/logout
// @Method: POST
// @Protected: true
// @Use: Logout User
router.post("/auth/logout", auth_1.logoutUser);
exports.default = router;

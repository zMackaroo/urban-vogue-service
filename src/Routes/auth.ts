import { Router } from "express";
import { getUser, logoutUser, refreshToken } from "../Handlers/auth";

const router = Router();

// @Route: /auth
// @Method: POST
// @Protected: false
// @Use: Get Users from 'tbl_users'
router.post("/auth", getUser);

// @Route: /auth/refresh
// @Method: POST
// @Protected: true
// @Use: Refresh token
router.post("/auth/refresh", refreshToken);

// @Route: /auth/logout
// @Method: POST
// @Protected: true
// @Use: Logout User
router.post("/auth/logout", logoutUser);

export default router;

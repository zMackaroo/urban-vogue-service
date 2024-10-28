import { Router } from "express";
import blogPostRouter from "./blogPost";
import authRouter from "./auth";

const router = Router();

router.use(blogPostRouter);
router.use(authRouter);

export default router;

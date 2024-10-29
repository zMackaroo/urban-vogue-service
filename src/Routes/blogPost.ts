import { Router } from "express";
import {
  Create,
  Get,
  deleteBlogPost,
  updateBlogPost,
} from "../Handlers/blogPost";
import { validateAuth } from "../Middlewares/Auth/validateAuth";

const router = Router();

// @Route: /blogpost
// @Method: GET
// @Protected: false
// @Use: Get Users from 'tbl_blogpost'
router.get("/api/blogpost", Get.getAll);

// @Route: /blogpost/:id
// @Method: GET
// @Protected: false
// @Use: Get Blogpost by ID from 'tbl_blogpost'
router.get("/api/blogpost/:id", Get.getById);

// @Route: /blogpost
// @Method: POST
// @Protected: true
// @Use: Create Blogpost to 'tbl_blogpost'
router.post("/api/blogpost", Create.validate, Create.store);

// @Route: /blogpost
// @Method: PATCH
// @Protected: true
// @Use: Update Blogpost from 'tbl_blogpost'
router.patch("/api/blogpost", validateAuth, updateBlogPost);

// @Route: /blogpost
// @Method: DELETE
// @Protected: true
// @Use: Delete Blogpost from 'tbl_blogpost'
router.delete("/api/blogpost", validateAuth, deleteBlogPost);

export default router;

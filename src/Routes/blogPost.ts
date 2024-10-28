import { Router } from "express";
import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPost,
  getBlogPostById,
  updateBlogPost,
} from "../Handlers/blogPost";
import { validateAuth } from "../Middlewares/Auth/validateAuth";

const router = Router();

// @Route: /blogpost
// @Method: GET
// @Protected: false
// @Use: Get Users from 'tbl_blogpost'
router.get("/blogpost", getAllBlogPost);

// @Route: /blogpost/:id
// @Method: GET
// @Protected: false
// @Use: Get Blogpost by ID from 'tbl_blogpost'
router.get("/blogpost/:id", getBlogPostById);

// @Route: /blogpost
// @Method: POST
// @Protected: true
// @Use: Create Blogpost to 'tbl_blogpost'
router.post("/blogpost", createBlogPost);

// @Route: /blogpost
// @Method: PATCH
// @Protected: true
// @Use: Update Blogpost from 'tbl_blogpost'
router.patch("/blogpost", validateAuth, updateBlogPost);

// @Route: /blogpost
// @Method: DELETE
// @Protected: true
// @Use: Delete Blogpost from 'tbl_blogpost'
router.delete("/blogpost", validateAuth, deleteBlogPost);

export default router;

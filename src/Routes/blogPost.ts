import { Router } from "express";
import {
  getAllPublishedBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  storeBlogPost,
  deleteBlogPost,
  updateBlogPost,
} from "../Handlers/blogPost";

import {
  storeBlogPostPayload,
  updateOrDeleteBlogPostPayload,
} from "../Schema/Validation/blogPostValidation.schema";

const router = Router();

// @Route: /blogpost
// @Method: GET
// @Protected: false
// @Use: Get Users from collection 'blogpost'
router.get("/blogpost", getAllPublishedBlogPost);
router.get("/blogposts", getAllBlogPosts);

// @Route: /blogpost/:id
// @Method: GET
// @Protected: false
// @Use: Get Blogpost by ID from collection 'blogpost'
router.get("/blogpost/:id", getBlogPostById);

// @Route: /blogpost
// @Method: POST
// @Protected: true
// @Use: Create Blogpost to collection 'blogpost'
router.post("/blogpost", storeBlogPostPayload, storeBlogPost);

// @Route: /blogpost
// @Method: PATCH
// @Protected: true
// @Use: Update Blogpost from collection 'blogpost'
router.patch("/blogpost", updateOrDeleteBlogPostPayload, updateBlogPost);

// @Route: /blogpost
// @Method: DELETE
// @Protected: true
// @Use: Delete Blogpost from 'tbl_blogpost'
router.delete("/blogpost", updateOrDeleteBlogPostPayload, deleteBlogPost);

export default router;

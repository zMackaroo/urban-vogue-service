"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogPost_1 = require("../Handlers/blogPost");
const validateAuth_1 = require("../Middlewares/Auth/validateAuth");
const router = (0, express_1.Router)();
// @Route: /blogpost
// @Method: GET
// @Protected: false
// @Use: Get Users from 'tbl_blogpost'
router.get("/blogpost", blogPost_1.Get.getAll);
// @Route: /blogpost/:id
// @Method: GET
// @Protected: false
// @Use: Get Blogpost by ID from 'tbl_blogpost'
router.get("/blogpost/:id", blogPost_1.Get.getById);
// @Route: /blogpost
// @Method: POST
// @Protected: true
// @Use: Create Blogpost to 'tbl_blogpost'
router.post("/blogpost", blogPost_1.Create.validate, blogPost_1.Create.store);
// @Route: /blogpost
// @Method: PATCH
// @Protected: true
// @Use: Update Blogpost from 'tbl_blogpost'
router.patch("/blogpost", validateAuth_1.validateAuth, blogPost_1.updateBlogPost);
// @Route: /blogpost
// @Method: DELETE
// @Protected: true
// @Use: Delete Blogpost from 'tbl_blogpost'
router.delete("/blogpost", validateAuth_1.validateAuth, blogPost_1.deleteBlogPost);
exports.default = router;

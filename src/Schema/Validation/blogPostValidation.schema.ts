import { checkSchema, body } from "express-validator";
import { blogPostModel } from "../blogPosts.schema";

export const storeBlogPostPayload = checkSchema({
  title: {
    isEmpty: { negated: true },
    errorMessage: "title cannot be empty or undefined",
  },
  description: {
    isEmpty: { negated: true },
    errorMessage: "description cannot be empty or undefined",
  },
  imageLink: {
    isEmpty: { negated: true },
    errorMessage: "imageLink cannot be empty or undefined",
  },
  date: {
    isEmpty: { negated: true },
    isDate: true,
    errorMessage:
      "date cannot be empty or undefined and must be in date format",
  },
  content: {
    isEmpty: { negated: true },
    errorMessage: "content cannot be empty or undefined",
  },
});

export const updateOrDeleteBlogPostPayload = body("id").custom(
  async (value) => await blogPostModel.findOne({ _id: value })
);

import { NextFunction, Request, Response } from "express";
import { blogPostModel } from "../Schema/blogPosts.schema";

export async function getAllBlogPost(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const blogPosts = await blogPostModel.find();
  return response.status(200).send(blogPosts);
}

export async function getBlogPostById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.params;

  if (id === "" || id === undefined) {
    return response.status(400).send({ message: "invalid id" });
  }
  const blogPosts = await blogPostModel.findOne({ _id: id });
  return response.status(200).send(blogPosts);
}

export async function createBlogPost(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { body } = request;

  if (
    body?.title === "" ||
    body?.description === "" ||
    body?.imageLink === "" ||
    body?.date === "" ||
    body?.content === ""
  ) {
    return response.json({ message: "Invalid payload check required fields" });
  }
  await blogPostModel.create({
    title: body?.title,
    description: body?.description,
    imageLink: body?.imageLink,
    date: body?.date,
    content: body?.content,
  });

  return response.status(200).json({ message: "Posts Saved !" });
}

export function updateBlogPost(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.send("Update");
}

export function deleteBlogPost(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.send("Delete");
}

import { NextFunction, Request, Response } from "express";
import { blogPostModel } from "../Schema/blogPosts.schema";

async function getAllBlogPost(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const blogPosts = await blogPostModel.find().sort({ date: -1 });
  return response.status(200).send(blogPosts);
}

async function getBlogPostById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.params;

  if (id === "" || id === undefined) {
    return response.status(400).send({ message: "Invalid id" });
  }

  const blogPosts = await blogPostModel.findOne({ _id: id });
  return response.status(200).send(blogPosts);
}

async function validateBlogPostRequest(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { body } = request;
  // Create logic for validating token

  if (
    body?.title === "" ||
    body?.description === "" ||
    body?.imageLink === "" ||
    body?.date === "" ||
    body?.content === ""
  ) {
    return response
      .status(400)
      .json({ message: "Invalid payload check required fields" });
  }

  const isExisting = await blogPostModel.findOne({ title: body?.title });

  if (isExisting) {
    const updateExisting = await blogPostModel.updateOne(
      { _id: isExisting._id },
      { ...body }
    );

    if (updateExisting) {
      return response.sendStatus(200);
    } else {
      return response.sendStatus(400);
    }
  }

  next();
}

async function storeBlogPost(request: Request, response: Response) {
  const { body } = request;

  await blogPostModel.create({
    title: body?.title,
    description: body?.description,
    imageLink: body?.imageLink,
    date: body?.date,
    content: body?.content,
  });

  return response.sendStatus(200);
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

export const Create = {
  validate: validateBlogPostRequest,
  store: storeBlogPost,
};

export const Get = {
  getAll: getAllBlogPost,
  getById: getBlogPostById,
};

import { Request, Response } from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { blogPostModel } from "../Schema/blogPosts.schema";
import { RunConnection } from "../Utils/dbConnect";

export async function getAllPublishedBlogPost(
  request: Request,
  response: Response
) {
  await RunConnection();
  const page = Number(request.query.page);
  const limit = Math.max(0, Number(request.query.limit));

  const blogPosts = await blogPostModel
    .find({ isPublished: true })
    .sort({ date: -1 })
    .skip(limit * (page - 1))
    .limit(limit);
  return response.status(200).send(blogPosts);
}

export async function getAllBlogPosts(request: Request, response: Response) {
  await RunConnection();
  const page = Number(request.query.page);
  const limit = Math.max(0, Number(request.query.limit));

  const blogPosts = await blogPostModel
    .find()
    .sort({ date: -1 })
    .skip(limit * (page - 1))
    .limit(limit);
  return response.status(200).send(blogPosts);
}

export async function getBlogPostById(request: Request, response: Response) {
  await RunConnection();
  const { id } = request.params;

  if (id === "" || id === undefined || !mongoose.isValidObjectId(id)) {
    return response.status(400).send({ message: "Invalid id" });
  }

  const blogPosts = await blogPostModel.findOne({ _id: id });
  return response.status(200).send(blogPosts);
}

export async function storeBlogPost(request: Request, response: Response) {
  await RunConnection();
  const result = validationResult(request);

  if (result.isEmpty()) {
    const { body } = request;

    const post = await blogPostModel.create({
      title: body?.title,
      description: body?.description,
      imageLink: body?.imageLink,
      date: body?.date,
      content: body?.content,
      isPublished: body?.isPublished,
      isSaved: body?.isSaved,
    });
    return response.status(200).send(post);
  }

  return response.status(400).send(result.array());
}

export async function updateBlogPost(request: Request, response: Response) {
  await RunConnection();
  const result = validationResult(request);

  if (result.isEmpty()) {
    await blogPostModel.updateOne(
      { _id: request.body.id },
      { ...request.body }
    );

    const updated = await blogPostModel.findOne({ _id: request.body.id });
    return response.status(200).send(updated);
  }

  return response.status(400).send({ message: "blogpost not found" });
}

export async function deleteBlogPost(request: Request, response: Response) {
  await RunConnection();
  const result = validationResult(request);

  if (result.isEmpty()) {
    await blogPostModel.deleteOne({ _id: request.body.id });
    return response.status(200).send({ message: "deleted" });
  }

  return response.status(400).send({ message: "blogpost not found" });
}

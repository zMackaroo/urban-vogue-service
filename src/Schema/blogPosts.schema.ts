import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  {
    capped: { size: 1024 },
    bufferCommands: true,
    autoCreate: false,
  }
);

export const blogPostModel = mongoose.model("blogposts", blogPostSchema);

import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://zmackaroo:Sep09051997!!@urbanvogue.erin2.mongodb.net/fad-blog"
);

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
    bufferCommands: false,
    autoCreate: false,
  }
);

export const blogPostModel = mongoose.model("blogposts", blogPostSchema);

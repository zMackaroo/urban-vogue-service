import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import routes from "./Routes";

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

const application = express();
dotenv.config();

application.use(cors());
application.use(express.json());
application.use(cookieParser());
application.use(routes);

mongoose
  .connect(
    "mongodb+srv://zmackaroo:Sep09051997!!@urbanvogue.erin2.mongodb.net/fad-blog"
  )
  .then(() => {
    console.log("Database connected");
    application.listen(process.env.PORT, () => {
      console.log(`Running on Port ${process.env.PORT}`);
    });
  });

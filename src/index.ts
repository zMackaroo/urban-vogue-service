import express from "express";
import ServerlessHttp = require("serverless-http");
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./Routes";
import { MongoDB } from "./Utils/dbConnect";

declare global {
  namespace Express {
    interface Request {
      user: string;
    }
  }
}

const application = express();
dotenv.config();

application.use(helmet());
application.use(cors());
application.use(express.json());
application.use(cookieParser());
application.use(routes);

application.listen(process.env.PORT, () => {
  console.log(`Development server is running on port ${process.env.PORT}`);
  MongoDB();
});

ServerlessHttp(application);

export default application;

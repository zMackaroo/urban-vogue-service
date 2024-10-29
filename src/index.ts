import express from "express";
import dotenv from "dotenv";
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

application.use(cors());
application.use(express.json());
application.use(cookieParser());
application.use(routes);

application.listen(process.env.PORT, () => {
  console.log(`Development server is running on port ${process.env.PORT}`);
  MongoDB();
});

export default application;

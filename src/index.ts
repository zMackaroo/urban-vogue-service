import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
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

application.use(helmet());
application.use(cors());
application.use(express.json());
application.use(cookieParser());
application.use(routes);

application.listen(process.env.PORT, () => {
  console.log(`Development server is running on port ${process.env.PORT}`);
});

export default application;

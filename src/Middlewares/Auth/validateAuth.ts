import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const validateAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token: any = request.headers.accesstoken;

  if (!token) return response.status(401).json({ message: "Un-authorized" });

  const accessToken = token.split(" ")[1];
  jwt.verify(
    accessToken,
    `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
    (err: any, user: any) => {
      if (err) {
        return response
          .status(403)
          .json({ message: "Invalid authorization token" });
      }

      request.user = user;
      next();
    }
  );
};

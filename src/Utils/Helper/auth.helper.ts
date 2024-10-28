import jwt from "jsonwebtoken";
import { IUser } from "../Types/user.types";

export const GenerateAccessToken = (user: IUser) => {
  return jwt.sign(user, `${process.env.JWT_ACCESS_TOKEN_SECRET}`, {
    expiresIn: 60000 * 120,
  });
};

export const GenerateRefreshToken = (user: IUser) => {
  return jwt.sign(user, `${process.env.JWT_REFRESH_TOKEN_SECRET}`);
};

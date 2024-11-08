import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  GenerateAccessToken,
  GenerateRefreshToken,
} from "../Utils/Helper/auth.helper";

import { RunConnection } from "../Utils/dbConnect";

let refreshTokens: string[] = [];
const mockUser = [
  { id: 1, email: "admin@urbanvogue.com", password: "A67JFolM" },
  { id: 2, email: "writer@urbanvogue.com", password: "T35WisZY" },
];

export async function getUser(request: Request, response: Response) {
  await RunConnection();
  const {
    body: { email, password },
  } = request;

  const findUser: any = mockUser.find((user) => user.email === email);
  if (!findUser || findUser.password !== password)
    return response.status(401).send({ message: "BAD CREDENTIALS" });

  const accessToken = GenerateAccessToken(findUser);
  const refreshToken = GenerateRefreshToken(findUser);
  refreshTokens.push(refreshToken);

  return response
    .status(200)
    .send({ email: findUser.email, accessToken, refreshToken });
}

export async function refreshToken(request: Request, response: Response) {
  await RunConnection();
  const refreshToken = request.body.token;

  if (!refreshToken) return response.status(401).json("Un-authorized");
  if (!refreshTokens.includes(refreshToken)) {
    return response.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(
    refreshToken,
    `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
    (err: any, user: any) => {
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const findUser: any = mockUser.find((data) => data.email === user.email);
      const newAccessToken = GenerateAccessToken(findUser);
      const newRefreshToken = GenerateRefreshToken(findUser);

      refreshTokens.push(newRefreshToken);

      response.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    }
  );
}

export async function logoutUser(request: Request, response: Response) {
  await RunConnection();
  const refreshToken = request.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  response.status(200).json("You logged out successfully.");
}

export function createUser(request: Request, response: Response) {}

export function updateUser(request: Request, response: Response) {}

export function deleteUser(request: Request, response: Response) {}

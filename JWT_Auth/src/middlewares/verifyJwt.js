import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import * as helper from "../utils/helper.js";

dotenv.config();

export const verifyJwt = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const accessToken = authorization.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return next();
  } catch (error) {
    return helper.handleResponseSend(res, error.message, 500);
  }
};

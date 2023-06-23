import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config/envConfig";

import * as types from "../types/index";
import * as apiMessage from "../constants/apiMessageConstant";
import apiResponse, { replaceMessage } from "../utils/apiResponse";

import User, { TUser } from "../db/models/userModel";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";

export const signup = async (
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  const { firstName, lastName, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const data: TUser = {
    firstName,
    lastName,
    email,
    password: hashPassword,
  };
  const user = await User.create(data);
  const accessToken = jwt.sign({ id: user.id }, config.accessSecret, {
    expiresIn: 60 * 60 + 2,
  });
  apiResponse(res, 200, replaceMessage(apiMessage.createResource, "User"), {
    accessToken,
  });
};

export const login = async (
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, { password: 1 });
  if (!user)
    return apiResponse(
      res,
      httpStatus.FORBIDDEN,
      replaceMessage(apiMessage.doesNotExistResource, "User")
    );
  const isPassMatch = bcrypt.compare(password, user.password);

  if (!isPassMatch)
    return apiResponse(
      res,
      httpStatus.FORBIDDEN,
      replaceMessage(apiMessage.incorrectResource, "Password")
    );

  const accessToken = jwt.sign({ id: user.id }, config.accessSecret, {
    expiresIn: 60 * 60 + 2,
  });
  apiResponse(res, 200, replaceMessage(apiMessage.createResource, "User"), {
    accessToken,
  });
};

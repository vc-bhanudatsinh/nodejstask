import mongoose from "mongoose";
import mongodb, { MongoError } from "mongodb";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import * as types from "../types/index";

import ApiError from "../utils/apiError";
import config from "../config/envConfig";
import * as apiMessage from "../constants/apiMessageConstant";

export const duplicateDataError = async (
  error: MongoError | ApiError,
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  if (error instanceof MongoError && error.code === 11000) {
    const key = Object.keys((error as mongodb.MongoServerError).keyPattern)[0];
    error = new ApiError(409, apiMessage.duplicate.replace("##", key));
  }
  next(error);
};

export const errorConverter = async (
  error: types.IApiError | Error,
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  console.log("error", error);
  // let newError:
  const errorClass = [
    {
      class: mongoose.Error,
      statusCode: httpStatus.BAD_REQUEST,
    },
    {
      class: jwt.JsonWebTokenError,
      statusCode: httpStatus.FORBIDDEN,
    },
  ];
  if (!(error instanceof ApiError)) {
    let statusCode;
    if ("statusCode" in error) {
      statusCode = error.statusCode;
    } else {
      for (let i = 0; i < errorClass.length; i++) {
        if (error instanceof errorClass[i].class) {
          statusCode = errorClass[i].statusCode;
          break;
        }
      }
      if (!statusCode) statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    console.log("---------statusCode", statusCode);
    const message = error.message;
    error = new ApiError(statusCode, message, error.stack);
  }
  next(error);
};

export const errorHandler = async (
  error: types.IApiError,
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  const { statusCode, message } = error;
  console.log("statusCode", statusCode);
  return res.status(statusCode).send({
    code: statusCode,
    message,
    ...(config.env === "development " && { stack: error.stack }),
  });
};

import { NextFunction } from "express";
import * as types from "../types/index";

type fnType = (
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => void;

const catchWraper =
  (fn: fnType) =>
  (req: types.request, res: types.response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: unknown) => {
      if (error instanceof Error) next(error);
    });
  };

export default catchWraper;

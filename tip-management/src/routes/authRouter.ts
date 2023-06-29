import express from "express";

import catchWraper from "../utils/catchWraper";
import validate from "../middlewares/validation";
import { duplicateDataError } from "../middlewares/error";
import * as authValidation from "../validation/authValidationSchema";
import * as authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validate(authValidation.userSignUpSchema),
  catchWraper(authController.signup),
  duplicateDataError
);
authRouter.post(
  "/login",
  validate(authValidation.loginSchema),
  catchWraper(authController.login)
);

export default authRouter;

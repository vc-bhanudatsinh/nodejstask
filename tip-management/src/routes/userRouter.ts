import express from "express";

import catchWraper from "../utils/catchWraper";
import verfiyJwtToken from "../middlewares/verifyJwt";
import validate from "../middlewares/validation";

import * as userValidation from "../validation/userValidationSchema";
import * as userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(
  "/profile",
  verfiyJwtToken,
  catchWraper(userController.getProfile)
);
userRouter.patch(
  "/profile",
  validate(userValidation.editProfileSchema),
  verfiyJwtToken,
  catchWraper(userController.editProfile)
);

export default userRouter;

import express from "express";
import * as authController from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post("/login", authController.loginUser);

authRouter.post("/signup", authController.signupUser);

export default authRouter;

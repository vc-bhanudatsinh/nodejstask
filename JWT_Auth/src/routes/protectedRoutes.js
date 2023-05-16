import express from "express";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import * as userController from "../controllers/userController.js";
const protectRouter = express.Router();

protectRouter.get("/", verifyJwt, userController.getUser);
export default protectRouter;

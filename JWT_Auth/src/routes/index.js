import express from "express";
import authRouter from "./authRoutes.js";
import protectedRouter from "./protectedRoutes.js";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/user", protectedRouter);
export default router;

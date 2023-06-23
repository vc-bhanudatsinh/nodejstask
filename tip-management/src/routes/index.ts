import express from "express";

import authRouter from "./authRouter";
import userRouter from "./userRouter";
import placesRouter from "./placesRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/place", placesRouter);

export default router;

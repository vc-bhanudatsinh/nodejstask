import express from "express";

import employeeRouter from "./employeeRoutes.js";

const router = express.Router();

router.use("/employee", employeeRouter);

export default router;

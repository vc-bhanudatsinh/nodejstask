import express from "express";
import * as sheetController from "../controllers/sheetController.js";
const router = express.Router();

router.post("/", sheetController.addUser);

export default router;

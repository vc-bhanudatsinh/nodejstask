import express from "express";
import * as authController from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/login", authController.renderLogin);
router.get("/dashboard", authController.getDashboard);
router.get("/home", authController.renderDashboard);

export default router;

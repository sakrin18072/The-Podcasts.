import express from "express";
import { forgotPasswordController, loginController, registerController, userUpdateController } from "../controllers/authController.js";
const router = express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.post("/forgot-password",forgotPasswordController);
router.post("/update-user",userUpdateController);

export default router;
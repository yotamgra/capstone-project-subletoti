import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  forgotPassword
} from "../controllers/userController.js";
import { protect } from "../middleweare/authMiddleweare.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/me", protect, getMe);

export { router as userRoutes };

import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userController.js";
import { protect } from "../middleweare/authMiddleweare.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export { router as userRoutes };

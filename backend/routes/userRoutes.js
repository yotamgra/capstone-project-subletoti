import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);

export { router as userRoutes };

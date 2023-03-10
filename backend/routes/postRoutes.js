import express from "express";
import {
  deletePost,
  getPosts,
  getPostById,
  setPost,
  updatePost,
} from "../controllers/postController.js";
import { protect } from "../middleweare/authMiddleweare.js";

const router = express.Router();

router.route("/").get(protect, getPosts).post(protect, setPost);

router
  .route("/:id")
  .get(protect, getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export { router as postRoutes };

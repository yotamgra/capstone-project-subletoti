import express from "express";
import {
  deletePost,
  getPosts,
  getPostById,
  setPost,
  updatePost,
  uploadImage
} from "../controllers/postController.js";
import { protect } from "../middleweare/authMiddleweare.js";

const router = express.Router();

router.route("/").get(protect, getPosts).post(protect, setPost);
router.route("/upload").post(uploadImage)

router
  .route("/:id")
  .get(protect, getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export { router as postRoutes };

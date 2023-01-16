import express from "express";
import { deletePost, getPosts, setPost, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts).post(setPost)

router.route("/:id").put(updatePost).delete(deletePost)

export { router as postsRoutes };
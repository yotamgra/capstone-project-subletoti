import express from "express";
import { getPosts, setPost } from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts).post(setPost)

export { router as postsRoutes };
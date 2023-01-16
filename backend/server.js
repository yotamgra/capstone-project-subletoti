import express from "express";
import * as dotenv from "dotenv";
import { postsRoutes } from "./routes/postsRoutes.js";

dotenv.config(); 
const port = process.env.PORT || 5000;

const app = express();

app.use('/posts',postsRoutes)

app.listen(port, () => console.log(`server is running on port ${port}`));
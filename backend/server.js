import express from "express";
import * as dotenv from "dotenv";
import { postsRoutes } from "./routes/postsRoutes.js";
import {errorHandler} from "./middleweare/errorMiddleweare.js"
import { connectDB } from "./config/db.js";

dotenv.config(); 
const port = process.env.PORT || 5000;

connectDB()

const app = express();

//Accepting body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts',postsRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`server is running on port ${port}`));
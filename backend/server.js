import express from "express";
import * as dotenv from "dotenv";
import { postRoutes } from "./routes/postRoutes.js";
import { reservationRoutes } from "./routes/reservationRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import {errorHandler} from "./middleweare/errorMiddleweare.js"
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config(); 
const port = process.env.PORT || 5000;

connectDB()

const app = express();
app.use(cors());

//Accepting body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts',postRoutes)
app.use('/users',userRoutes)
app.use('/reservations',reservationRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`server is running on port ${port}`));
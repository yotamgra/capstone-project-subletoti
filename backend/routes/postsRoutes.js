import express from "express";

const router = express.Router();

router.route("/").get((req,res)=>{
    res.status(200).send({message:"Get posts"})
})

export { router as postsRoutes };
import asyncHandler from "express-async-handler";

//@desc    Get posts
//@route   GET /posts
//@access  Private
const getPosts = asyncHandler(async (req, res) => {
    res.status(200).send({ message: "Get posts" });
  });


//@desc    Set post
//@route   POST /posts
//@access  Private
const setPost = asyncHandler(async (req, res) => {
    if(!req.body.text){
      res.status(400)
      throw new Error("please add a text field")
    }
  
    res.status(200).send({ message: "Set post" });
  });

export { getPosts, setPost };

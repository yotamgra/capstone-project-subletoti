import asyncHandler from "express-async-handler";
import Post from "../model/postModel.js";

//@desc    Get posts
//@route   GET /posts
//@access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).send(posts);
});

//@desc    Set post
//@route   POST /posts
//@access  Private
const setPost = asyncHandler(async (req, res) => {
  const { header, price, location, description, img, availableFrom, availableUntil } = req.body.post;
  if (!header || !price || !location) {
    res.status(400);
    throw new Error("Post header, price and location are required");
  }
  const post = await Post.create({
    user: req.user.id,
    header,
    price,
    location,
    description: description || "",
    img: img || "",
    availableFrom,
    availableUntil
  });
  res.status(200).json(post);
});

//@desc    Update post
//@route   PUT /posts/:id
//@access  Private
const updatePost = asyncHandler(async (req, res) => {
  console.log("body",req.body);
  console.log("req.params.id",req.params.id);
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the loggedin user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

//@desc    Delete post
//@route   DELETE /posts/:id
//@access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the loggedin user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.remove();
  res.status(200).json({ id: req.params.id });
});

export { getPosts, setPost, updatePost, deletePost };

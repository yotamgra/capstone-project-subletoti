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
  const { header, price, location, description, img } = req.body.post;
  if (!header || !price || !location) {
    res.status(400);
    throw new Error("Post header, price and location are required");
  }
  const post = await Post.create({
    header,
    price,
    location,
    description: description || "",
    img: img || "",
  });
  res.status(200).json(post);
});

//@desc    Update post
//@route   PUT /posts/:id
//@access  Private
const updatePost = asyncHandler(async (req, res) => {
  console.log(req.body);
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
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

  await post.remove();
  res.status(200).json({ id: req.params.id });
});

export { getPosts, setPost, updatePost, deletePost };

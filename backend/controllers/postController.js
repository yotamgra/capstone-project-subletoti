import asyncHandler from "express-async-handler";
import Post from "../model/postModel.js";

const uploadImage = asyncHandler(async (req, res) => {
  console.log(req.newFileList);
  res.status(200).send("error");
});

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
  const {
    header,
    price,
    cleaningFee,
    location,
    description,
    imagesGallery,
    disabledDates,
    disabledRanges,
  } = req.body.post;

  if (!header || !price || !location || !cleaningFee) {
    res.status(400);
    throw new Error("Post header, price and location are required");
  }
  try {
    const post = await Post.create({
      user: req.user.id,
      header,
      price,
      cleaningFee,
      location,
      description: description || "",
      imagesGallery: imagesGallery || [],
      disabledDates,
      disabledRanges,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@desc    Get post by id
//@route   PUT /posts/:id
//@access  Private
const getPostById = asyncHandler(async (req, res) => {
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

  res.status(200).json(post);
});

//@desc    Update post
//@route   PUT /posts/:id
//@access  Private
const updatePost = asyncHandler(async (req, res) => {
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

export { getPosts, setPost, getPostById, updatePost, deletePost, uploadImage };

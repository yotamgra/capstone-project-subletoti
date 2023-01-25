import axios from "axios";

const API_URL = "http://localhost:5000/posts/";

//Get all posts
const getAllPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};
//Get post by Id
const getPostById = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + postId, config);

  return response.data;
};
//Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postData, config);

  return response.data;
};
//Update post
const updatePost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + postData._id, postData, config);

  return response.data;
};
//Delete post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + postId, config);

  return response.data;
};

const postService = { getAllPosts, createPost, getPostById, deletePost, updatePost };

export default postService;

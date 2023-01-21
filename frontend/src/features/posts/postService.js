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

const postService = { getAllPosts };

export default postService;

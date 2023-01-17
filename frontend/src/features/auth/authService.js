import axios from "axios";

const API_URL = "http://localhost:5000/users/";

//Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const authService = {
    register
 
  };
  
  export default authService;
  
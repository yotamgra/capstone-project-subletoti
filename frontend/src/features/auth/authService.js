import axios from "axios";

const API_URL = "http://localhost:5000/users/";

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Forgot password
const forgotPassword = async (email) => {
  const response = await axios.post(API_URL + "forgot-password", email);

  return response.data
};

const authService = {
  register,
  login,
  forgotPassword
};

export default authService;

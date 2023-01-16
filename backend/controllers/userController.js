//@desc    Register new user
//@route   POST /users
//@access  Public
const registerUser = (req, res) => {
  res.json({ message: "Register User" });
};

//@desc    Authenticate a user
//@route   POST /users/login
//@access  Public
const loginUser = (req, res) => {
  res.json({ message: "Login User" });
};

//@desc    Get user data
//@route   GET /users/me
//@access  Private
const getMe = (req, res) => {
  res.json({ message: "Get User" });
};

export { registerUser, loginUser, getMe };

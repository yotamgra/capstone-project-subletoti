import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import { transporter } from "../config/email.js";

//@desc    Register new user
//@route   POST /users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc    Authenticate a user
//@route   POST /users/login
//@access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc    Forgot password - create rest token
//@route   POST /users/forgot-password
//@access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // check if the email is valid
  // 400 BAD REQUEST
  if (!email) {
    res.status(400);

    throw new Error("Email is required");
  }

  // check if the email exist in the database
  // 400 BAD REQUEST
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }
  const userId = user._id;

  // create a reset token
  user.resetToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  // save the reset token in the database
  const { resetToken } = await user.save();

  const FRONTEND_URL = "http://localhost:3000/reset-password/";

  // send the reset token to the user email
  const mailOptions = {
    from: "noreply@example.com",
    to: email,
    subject: "Password Reset Token",
    text: `If you wanted to reset your password, click on thie link ${FRONTEND_URL}${resetToken}. Please use it to reset your password.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500);
      throw new Error("Error sending reset token email");
    } else {
      res.status(200).json({ message: "Reset token sent to the user's email" });
    }
  });
});

//@desc    Get user data
//@route   GET /users/me
//@access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, forgotPassword, getMe };

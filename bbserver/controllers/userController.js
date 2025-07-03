import { User, UserDetails } from "../models/UserModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

// Create a new user
const createUser = asyncHandler(async (req, res) => {
  const { username, phonenumber, email, password, isDonor } = req.body;

  if (!username || !email || !password || !phonenumber) {
    res.status(400);
    throw new Error("Please fill all the input fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error("User already exists");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
    phonenumber,
    isDonor,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    console.log(newUser);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      phonenumber: newUser.phonenumber,
      isDonor: newUser.isDonor,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error creating user: " + error.message);
  }
});
//Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the input fields");
  }
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(404);
    throw new Error("User Not Found");

    return;
  }
  try {
    const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    if (!isPasswordMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
      return;
    }
    createToken(res, userExists._id);
    res.status(200).json({
      _id: userExists._id,
      username: userExists.username,
      email: userExists.email,
      phonenumber: userExists.phonenumber,
      isDonor: userExists.isDonor,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error adding user details: " + error.message);
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out Successfully" });
});

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
});

const changeDonorStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {  isDonor } = req.body;
  if (!userId || isDonor === undefined) {
    res.status(400);
    throw new Error("Please provide userId and isDonor status");
  }
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isDonor: isDonor },
      { new: true }
    );
    res.status(200).json({
      message: `User ${isDonor ? "activated" : "deactivated"} successfully`,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error adding user details: " + error.message);
  }
});
export { createUser, loginUser, logOutUser, getUser, changeDonorStatus };

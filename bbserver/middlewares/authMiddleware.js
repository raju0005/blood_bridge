import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.Blood_Bridge_JWT;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);
      console.log("Authenticated user:", req.user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
});

const isDonor = asyncHandler(async (req, res, next) => {
  const token = req.cookies.Blood_Bridge_JWT;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      if (req.user.isDonor) {
        res.status(401);
        throw new Error("Not authorized , you already a donor");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized " + error.message);
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
});

export { authenticate, isDonor };

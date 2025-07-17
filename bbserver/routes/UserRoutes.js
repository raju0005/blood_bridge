import express from "express";
import {
  createUser,
  getUser,
  loginUser,
  logOutUser,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(createUser);
// router.route("/send_otp").post(sendOtp);
// router.route("/verify_otp").post(verifyOtp);
router.route("/login").post(loginUser);
router.route("/logout").post(logOutUser);
router.route("/getMe").get(authenticate, getUser);

export default router;

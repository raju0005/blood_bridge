import express from "express";
import {
  changeDonorStatus,
  createUser,
  getUser,
  loginUser,
  logOutUser,
} from "../controllers/userController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logOutUser);
router.route("/getMe").get(authenticate, getUser);
router.route("/changeDonor").patch(authenticate, changeDonorStatus);

export default router;

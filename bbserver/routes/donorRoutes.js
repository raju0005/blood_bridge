import express from "express";
import { authenticate, isDonor } from "../middlewares/authMiddleware.js";
import {
  createDonorDetails,
  getDonorById,
  getDonorsbyCityandBlood,
  updateDonorProfile,
} from "../controllers/donorController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/getDonors").get(authenticate, getDonorsbyCityandBlood);
router
  .route("/createdonor")
  .post(
    authenticate,
    isDonor,
    upload.single("profilePicture"),
    createDonorDetails
  );
router.route("/:id").get(authenticate, getDonorById);
router
  .route("/update_profile")
  .patch(authenticate, upload.single("profilePicture"), updateDonorProfile);
export default router;

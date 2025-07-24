import asyncHandler from "../middlewares/asyncHandler.js";
import { User, UserDetails } from "../models/UserModel.js";

// Calculate age from date of birth
const calculateAge = (dateofBirth) => {
  const today = new Date();
  const birthDate = new Date(dateofBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// Add user details
const createDonorDetails = asyncHandler(async (req, res) => {
  const {
    dateofBirth,
    gender,
    bloodGroup,
    state,
    city,
    dateOfLastDonation,
    address,
  } = req.body;

  const userId = req.user._id;
  const uploadedImage = req.file ? req.file.path : null;

  if (
    !dateofBirth ||
    !gender ||
    !bloodGroup ||
    !state ||
    !city ||
    !dateOfLastDonation ||
    !userId ||
    !address ||
    !uploadedImage
  ) {
    res.status(400);
    throw new Error("Please fill all the input fields");
  }

  const age = calculateAge(dateofBirth);
  if (age < 18) {
    res.status(400);
    throw new Error("You are not eligible");
  }

  const userExists = await User.findById(userId);
  if (!userExists) {
    res.status(404);
    throw new Error("User not found");
  }
  if (userExists.isDonor) {
    res.status(403);
    throw new Error("You are already registered as a donor");
  }

  const userDetailsExists = await UserDetails.findOne({ userId });
  if (userDetailsExists) {
    res.status(400);
    throw new Error("User details already exist");
  }

  // Now we know the user exists, and details don't exist — safe to proceed
  const newUserDetails = new UserDetails({
    dateofBirth,
    gender,
    bloodGroup,
    state,
    city,
    dateOfLastDonation,
    userId,
    address,
    profilePicture: uploadedImage,
  });

  await newUserDetails.save();

  // Only now: update user's donor status
  userExists.isDonor = true;
  await userExists.save();
  console.log(newUserDetails, userExists);

  res.status(201).json({
    message: "User details added successfully",
    details: newUserDetails, //this thing will be removed in prod
  });
});

//updateDonorApplication
const updateDonorProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const updates = { ...req.body };

  // If a file is uploaded, add it to updates

  updates.profilePicture = req.file ? req.file.path : null;

  try {
    const updatedDonorProfile = await UserDetails.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true }
    );

    if (!updatedDonorProfile) {
      res.status(404);
      throw new Error("User profile not found");
    }

    return res
      .status(200)
      .json({ message: "Updated successfully", details: updatedDonorProfile });
  } catch (err) {
    res.status(500);
    throw new Error("Error updating Profile: " + err.message);
  }
});

// Get donors by city and blood group
const getDonorsbyCityandBlood = asyncHandler(async (req, res) => {
  const { city, bloodGroup } = req.query;
  try {
    const donors = await UserDetails.find({
      city,
      bloodGroup,
    }).populate({
      path: "userId",
      match: { isDonor: true },
      select: "username email phonenumber isDonor",
    });

    const filteredDonors = donors.filter((donor) => donor.userId !== null);
    if (filteredDonors.length === 0) {
      return res.status(200).json([]);
    }

    console.log(filteredDonors[0].userId);
    res.status(200).json(filteredDonors);
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching donors: " + error.message);
  }
});

//Get Donor by UserId
const getDonorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const donor = await User.findById(id);
    if (!donor) {
      res.status(404);
      throw new Error("Donor not found");
    }
    const donorDetails = await UserDetails.findOne({ userId: id });
    const age = calculateAge(donorDetails.dateofBirth);

    if (!donorDetails) {
      res.status(404);
      throw new Error("Donor Details not found");
    }

    const donorInfo = { ...donor.toObject(), ...donorDetails.toObject(), age };
    res.status(200).json(donorInfo);
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching donors: " + error.message);
  }
});

export {
  createDonorDetails,
  getDonorsbyCityandBlood,
  getDonorById,
  updateDonorProfile,
};

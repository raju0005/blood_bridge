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
    userId,
  } = req.body;
  const uploadedImage = req.file ? req.file.path : null;
  console.log("Body:", req.body);
  console.log("File:", req.file);

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

  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      res.status(404);
      throw new Error("User not Found");

      return;
    }
    const userDetailsExists = await UserDetails.findOne({ userId });

    if (userDetailsExists) {
      return res.status(400);
      throw new Error("User details already exist");
    }

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
    userExists.isDonor = true;
    await userExists.save();

    return res.status(201).json({
      message: "User details added successfully",
      details: newUserDetails,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error adding user details: " + error.message);
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
      res.status(404).json({ message: "No donors found" });
      return;
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
    const donor = await User.findById(id).select("-password");
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



export { createDonorDetails, getDonorsbyCityandBlood, getDonorById };

import { User, UserDetails } from "../models/UserModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";
import dotenv from "dotenv";
import admin from "../utils/firebase_admin.js";

dotenv.config();

// Create a new user
// const createUser = asyncHandler(async (req, res) => {
//   const { username, phonenumber, email, password, isDonor } = req.body;

//   if (!username || !email || !password || !phonenumber) {
//     res.status(400);
//     throw new Error("Please fill all the input fields");
//   }

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(409);
//     throw new Error("User already exists");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(password, salt);

//   const newUser = new User({
//     username,
//     email,
//     password: hashPassword,
//     phonenumber,
//     isDonor,
//   });

//   try {
//     await newUser.save();
//     createToken(res, newUser._id);
//     console.log(newUser);

//     return res.status(201).json({
//       _id: newUser._id,
//       username: newUser.username,
//       email: newUser.email,
//       phonenumber: newUser.phonenumber,
//       isDonor: newUser.isDonor,
//     });
//   } catch (error) {
//     res.status(500);
//     throw new Error("Error creating user: " + error.message);
//   }
// });

//Future registration

const createUser = asyncHandler(async (req, res) => {
  const { idToken, username, isDonor } = req.body;

  if (!idToken) {
    res.status(400);
    throw new Error("User is Not verified");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const phonenumber = decodedToken.phone_number;

    if (!phonenumber) {
      return res.status(400).json({ error: "Phone number not found in token" });
    }

    const userExists = await User.findOne({ phonenumber });

    if (userExists) {
      res.status(409);
      throw new Error("User Alredy Exists");
    }
    const newUser = new User({
      username,
      phonenumber,
      isDonor,
      firebaseUid: uid,
    });
    await newUser.save();
    createToken(res, newUser._id);
    console.log(newUser);
    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      phonenumber: newUser.phonenumber,
      isDonor: newUser.isDonor,
    });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(500);
    throw new Error(error.message);
  }
});

//Sending OTP
// const sendOtp = asyncHandler(async (req, res) => {
//   const { phoneNumber } = req.body;
//   const otp = generateOtp();
//   const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//   try {
//     await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         variables_values: otp,
//         route: "otp",
//         numbers: phone,
//       },
//       {
//         headers: {
//           authorization: FAST_2_SMS_KEY,
//         },
//       }
//     );

//     await Otp.deleteMany({ phoneNumber });
//     await Otp.create({ phoneNumber, otp, expiresAt, isVerified: false });

//     return res.status(200).json({ message: "Otp Sent Successfully" });
//   } catch (error) {
//     res.status(500);
//     throw new Error("Error adding user details: " + error.message);
//   }
// });

//Verify OTP
// const verifyOtp = asyncHandler(async (req, res) => {
//   const { phoneNumber, otp } = req.body;
//   const record = Otp.findOne({ phoneNumber });

//   try {
//     if (!record) {
//       res.status(404);
//       throw new Error("Otp Not Found");
//     }
//     if (new Date() > record.expiresAt) {
//       await Otp.deleteOne({ phone });
//       return res.status(400).json({ success: false, message: "OTP expired" });
//     }

//     if (record.otp === otp) {
//       await Otp.updateOne({ phoneNumber }, { isVerified: true });
//       return res.json({ success: true, message: "OTP verified" });
//     } else {
//       res.status(401);
//       throw new Error("Invalid Otp");
//     }
//   } catch (error) {
//     res.status(500);
//     throw new Error("Error adding user details: " + error.message);
//   }
// });

//Login user
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400);
//     throw new Error("Please fill all the input fields");
//   }
//   const userExists = await User.findOne({ email });
//   if (!userExists) {
//     res.status(404);
//     throw new Error("User Not Found");
//   }
//   try {
//     const isPasswordMatch = await bcrypt.compare(password, userExists.password);
//     if (!isPasswordMatch) {
//       res.status(401);
//       throw new Error("Invalid credentials");
//     }
//     createToken(res, userExists._id);
//     return res.status(200).json({
//       _id: userExists._id,
//       username: userExists.username,
//       email: userExists.email,
//       phonenumber: userExists.phonenumber,
//       isDonor: userExists.isDonor,
//     });
//   } catch (error) {
//     res.status(500);
//     throw new Error("Error adding user details: " + error.message);
//   }
// });

const loginUser = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    res.status(400);
    throw new Error("User is Not verified");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const phonenumber = decodedToken.phone_number;

    if (!phonenumber) {
      return res.status(400).json({ error: "Phone number not found in token" });
    }
    const userExists = await User.findOne({ phonenumber });

    if (!userExists) {
      res.status(404);
      throw new Error("User Not Found");
    }
    createToken(res, userExists._id);

    return res.status(200).json({
      _id: userExists._id,
      username: userExists.username,
      isDonor: userExists.isDonor,
    });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(500);
    throw new Error(error.message);
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

export { createUser, loginUser, logOutUser, getUser };

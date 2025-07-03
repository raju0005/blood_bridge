import mongoose from "mongoose";

const userRegistrationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDonor: {
      type: Boolean,
      default: false,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const userDetailsSchema = new mongoose.Schema(
  {
    dateofBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    dateOfLastDonation: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Models for each schema
const User = mongoose.model("User", userRegistrationSchema);
const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

export { User, UserDetails };

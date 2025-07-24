import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name cannot be empty"),
  phonenumber: yup.number().required("Phone Number cannot be empty"),
  otp: yup.number(),
  isDonor: yup.boolean(),
});

export const loginSchema = yup.object().shape({
  phonenumber: yup.number().required("Phone Number cannot be empty"),
  otp: yup.number(),
});

export const donorApplicationSchema = yup.object().shape({
  dateofBirth: yup
    .date()
    .typeError("Please select a valid date of birth")
    .required("Date Of Birth is required"),
  gender: yup.string().required("Gender is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  bloodGroup: yup.string().required("Blood Group is required"),
  address: yup.string().required("Address cannot be empty"),
  dateOfLastDonation: yup
    .date()
    .typeError("Please select a valid last donation date")
    .required("Last donation date is required"),
  profilePicture: yup
    .mixed()
    .required("Profile picture is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size < 5 * 1024 * 1024
    ),
});

export const profileSchema = yup.object().shape({
  dateofBirth: yup
    .date()
    .typeError("Please select a valid date of birth")
    .required("Date Of Birth is required"),
  gender: yup.string().required("Gender is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  bloodGroup: yup.string().required("Blood Group is required"),
  address: yup.string().required("Address cannot be empty"),
  dateOfLastDonation: yup
    .date()
    .typeError("Please select a valid last donation date")
    .required("Last donation date is required"),
  profilePicture: yup
    .mixed()
    .required("Profile picture is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size < 5 * 1024 * 1024
    ),
});

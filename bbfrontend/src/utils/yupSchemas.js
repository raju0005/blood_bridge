import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name cannot be empty"),
  email: yup.string().email("Invalid email").required("Email cannot be empty"),
  phonenumber: yup.string().required("Phone Number cannot be empty"),
  password: yup.string().required("Password cannot be empty"),
  confirmPassword: yup.string().required("Confirm Password cannot be empty"),
  isDonor: yup.boolean(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email cannot be empty"),
  password: yup.string().required("Password cannot be empty"),
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
    .typeError("Please select a valid date of birth")
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

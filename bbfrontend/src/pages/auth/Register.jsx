import {
  TextField,
  Button,
  Box,
  Typography,
  Link as MuiLink,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/yupSchemas";
import { usePhoneAuth, useRegister } from "../../api/usersApi";
import toast from "react-hot-toast";
import useUserStore from "../../zustand/store";
import { auth } from "../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState, useEffect } from "react";

const Register = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otp, setOtp] = useState("");
  const [userType, setUserType] = useState("");

  const {
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const phonenumber = watch("phonenumber");

  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const { register, data, loading: isLoading, error } = useRegister();
  const {
    sendOtp,
    verifyOtp,
    otpSent,
    isLoading: isOtpLoading,
    isOtpVerifying,
  } = usePhoneAuth();

  const handleSendOtp = async (data) => {
    const phone = getValues("phonenumber");
    const success = await sendOtp(phone);
    if (!success) {
      toast.error("Failed to send OTP.");
    }
  };

  const handleOtpVerification = async (formData) => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    const result = await verifyOtp(otp);
    if (!result) return;

    const { token } = result;
    handleRegister(formData, token);
  };

  const handleRegister = async (data, token) => {
    try {
      const response = await register({
        // email: data.email,
        username: data.name,
        phonenumber: data.phonenumber,
        idToken: token,
        // password: data.password,
      });

      setUserInfo(response);
      toast.success("Registered Successfully!");
      setTimeout(() => {
        navigate(userType === "donor" ? "/donor_application" : "/home");
      }, 800);
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        px: 2,
        py: 4,
      }}
    >
      <div id="recaptcha-container"></div>

      {/* Left Side Text */}
      <Box
        sx={{
          width: { md: "40%", xs: "100%" },
          textAlign: { xs: "center", md: "left" },
          mt: { xs: 2, md: 4 },
          mb: { xs: 4, md: 0 },
          px: { xs: 1, md: 5 },
        }}
      >
        <Typography sx={{ fontSize: { md: "2.5rem", xs: "1.5rem" } }}>
          Be the reason someone lives.
        </Typography>
        <Typography
          sx={{
            fontSize: { md: "5rem", xs: "3rem" },
          }}
          className="text-gradient"
        >
          Join as a donor today.
        </Typography>
      </Box>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit(handleOtpVerification)}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 450, md: 500 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mx: "auto",
          px: 2,
        }}
      >
        {/* Name */}
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Name"
              fullWidth
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isLoading}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  fontFamily: "'Mosafin SemBd', sans-serif",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "& input": {
                    backgroundColor: "white",
                    borderRadius: "4px",
                  },
                },
              }}
            />
          )}
        />

        {/* Phone Number */}
        <Box sx={{ position: "relative", width: "100%" }}>
          <Controller
            name="phonenumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Phone Number"
                fullWidth
                {...field}
                error={!!errors.phonenumber}
                helperText={errors.phonenumber?.message}
                disabled={isLoading}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                  },
                  "& .MuiOutlinedInput-root": {
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    fontSize: "1rem",
                    fontFamily: "'Mosafin SemBd', sans-serif",
                    letterSpacing: "0.1em",
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "& input": {
                      backgroundColor: "white",
                      borderRadius: "4px",
                    },
                  },
                }}
              />
            )}
          />
          {phonenumber && phonenumber.length > 0 && !otpSent && (
            <Button
              variant="text"
              size="small"
              onClick={() => handleSendOtp(getValues())}
              sx={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                zIndex: 1,
                padding: "4px 8px",
                minWidth: "auto",
              }}
            >
              Send OTP
            </Button>
          )}
        </Box>

        {/* OTP Input - Only show when OTP is sent */}
        {otpSent && (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Enter the 6-digit OTP sent to your phone:
            </Typography>
            <MuiOtpInput
              value={otp}
              onChange={setOtp}
              length={6}
              TextFieldsProps={{
                size: "small",
                sx: {
                  "& .MuiOutlinedInput-root": {
                    height: 50,
                    width: 50,
                    "&:hover fieldset": {
                      borderColor: "red",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "red",
                    },
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Radio Buttons */}
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            sx={{ flexWrap: "wrap" }}
          >
            <FormControlLabel
              value="donor"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      backgroundColor: "white",
                      borderRadius: "50%",
                    },
                  }}
                />
              }
              label="I want to Donate Blood"
              disabled={isLoading}
            />
            <FormControlLabel
              value="receiver"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      backgroundColor: "white",
                      borderRadius: "50%",
                    },
                  }}
                />
              }
              label="I am looking for Blood"
              disabled={isLoading}
            />
          </RadioGroup>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            height: 50,
            fontWeight: "bold",
            fontSize: 15,
            letterSpacing: "0.1em",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            gap: 2,
            minWidth: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          className="bg-gradient-primary"
        >
          <span
            className={`${
              isLoading || isOtpVerifying ? "text-hide" : ""
            } transition-opacity duration-400 ease-in-out`}
          >
            Register
          </span>
          <span
            className={`${
              isLoading || isOtpVerifying ? "emoji-drive" : ""
            } block transform transition-transform text-2xl`}
          >
            🚑
          </span>
        </Button>

        {/* Login Link */}
        <Typography textAlign="center">
          Already have an account?{" "}
          <MuiLink component={RouterLink} to="/login">
            LOGIN
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;

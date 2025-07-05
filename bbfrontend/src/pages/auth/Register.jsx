import {
  TextField,
  Button,
  Box,
  Typography,
  Link as MuiLink,
  FormControlLabel,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/yupSchemas";
import { useRegister } from "../../api/usersApi";
import toast from "react-hot-toast";
import useUserStore from "../../zustand/store";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const { register, data, loading: isLoading, error } = useRegister();

  const handleRegister = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await register({
        email: data.email,
        username: data.name,
        phonenumber: data.phonenumber,
        password: data.password,
      });

      setUserInfo(response);
      toast.success(
        "Registered Successfully! Thank you for joining the bridge of hope."
      );
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
        onSubmit={handleSubmit(handleRegister)}
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

        {/* Email */}
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Email"
              fullWidth
              {...field}
              error={!!errors.email}
              helperText={errors.email?.message}
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
                    borderRadius: "0.25rem",
                  },
                },
              }}
            />
          )}
        />

        {/* Phone Number */}
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

        {/* Password */}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl
              variant="outlined"
              fullWidth
              error={!!errors.password}
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
                  backgroundColor: "white",
                  borderRadius: "0.25rem",
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            >
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                {...field}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <Typography variant="caption" color="error">
                {errors.password?.message}
              </Typography>
            </FormControl>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl
              variant="outlined"
              fullWidth
              error={!!errors.confirmPassword}
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
                  backgroundColor: "white",
                  borderRadius: "4px",
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            >
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                {...field}
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              <Typography variant="caption" color="error">
                {errors.confirmPassword?.message}
              </Typography>
            </FormControl>
          )}
        />

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
            overflow:"hidden"
          }}
          className="bg-gradient-primary"
        >
          <span
            className={`${
              isLoading ? "text-hide" : ""
            } transition-opacity duration-400 ease-in-out`}
          >
            Register
          </span>
          <span
            className={`${
              isLoading ? "emoji-drive" : ""
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

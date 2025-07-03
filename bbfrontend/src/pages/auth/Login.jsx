import {
  TextField,
  Button,
  Box,
  Typography,
  Link as MuiLink,
  CircularProgress,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/yupSchemas";
import { useLogin } from "../../api/usersApi";
import toast from "react-hot-toast";
import useUserStore from "../../zustand/store";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { login, data, loading: isLoading, error } = useLogin();

  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const handleLogin = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      console.log("Logged in Successfully:", response);

      setUserInfo(response);
      toast.success(
        "Logged in Successfully! Every login is a step toward saving lives."
      );
      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (err) {
      toast.err(err?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        width: "100vw",
        height: { md: "70vh" },
        alignItems: "center",
        justifyContent: "space-around",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          width: { md: "30%", xs: "100%" },
          marginTop: { xs: "20px", md: "0px" },
          textAlign: { xs: "center", md: "left" },
          ml: { xs: 0, md: 10 },
          px: { xs: 2, md: 0 },
        }}
      >
        <Typography
          sx={{ fontSize: { md: "3rem", xs: "1.5rem" } }}
          color="initial"
        >
          Log in. Connect.
          <br />
        </Typography>
        <Typography
          sx={{
            fontSize: { md: "6.25rem", xs: "3rem" },
          }}
          className="text-gradient"
        >
          Save lives.
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        sx={{
          width: { xs: "100%", md: "40%" },
          display: "flex",
          gap: 2,
          flexDirection: "column",
          maxWidth: { xs: 350, md: 500 },
          mx: "auto",
          mt: 4,
        }}
      >
        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
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
              label="Email"
              {...field}
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />

        {/* Password_Field */}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                },
                "& .MuiOutlinedInput-root": {
                  overflow: "hidden",
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
              variant="outlined"
              fullWidth
              error={!!errors.password}
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

        <Button
          type="submit"
          variant="contained"
          sx={{
            height: 50,
            fontWeight: "bold",
            fontSize: 15,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            letterSpacing: "0.1em",
            gap: 2,
          }}
          className="bg-gradient-primary"
        >
          <span
            className={`${
              isLoading ? "text-hide" : ""
            } transition-opacity duration-400 ease-in-out`}
          >
            LogIn
          </span>
          <span
            className={`${
              isLoading ? "emoji-drive" : ""
            } block transform transition-transform text-2xl`}
          >
            🚑
          </span>
        </Button>
        <Typography variant="body1" color="black" sx={{}}>
          New User?{" "}
          <MuiLink
            component={RouterLink}
            to={`/register`}
            className="underline"
          >
            REGISTER
          </MuiLink>
        </Typography>

        {errorMessage && (
          <Typography variant="body1" color="error" sx={{}}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
export default Login;

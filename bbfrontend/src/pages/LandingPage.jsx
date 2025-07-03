import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [animateEmoji, setAnimateEmoji] = useState(false);

  const handleClick = () => {
    setAnimateEmoji(true);
    setTimeout(() => {
      navigate("/register");
    }, 1000); // match animation duration
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mx: "auto",
      }}
      mt={10}
    >
      <Box>
        <Stack
          spacing={1}
          sx={{
            px: { xs: 1, md: "auto" },
            textAlign: { xs: "center", md: "center" },
          }}
        >
          <Typography
            sx={{
              mb: 3,
              fontSize: {
                xs: "3.2rem",
                md: "6rem",
              },
            }}
            className="text-gradient"
          >
            “Bridge the gap,
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "2.2rem",
                md: "4rem",
              },
            }}
            color="initial"
          >
            Give the gift of life.”
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Mosafin SemBd', sans-serif",
              fontSize: { md: "1.2rem", xs: "0.82rem" },
              fontWeight: "bold",
            }}
            color="initial"
          >
            Find a donor or become one today – every drop matters.
          </Typography>
        </Stack>
      </Box>

      <Button
        type="button"
        variant="contained"
        sx={{
          height: 40,
          fontWeight: "bold",
          fontSize: 15,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          letterSpacing: "0.1em",
          mt: 5,
          minWidth: "160px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
        className="bg-gradient-primary"
        onClick={handleClick}
      >
        <span
          className={`${
            animateEmoji ? "text-hide" : ""
          } transition-opacity duration-400 ease-in-out text-center`}
        >
          Get Started
        </span>
        <span
          className={`${
            animateEmoji ? "emoji-drive" : ""
          } block transform transition-transform text-xl`}
        >
          🚑
        </span>
      </Button>
    </Box>
  );
};

export default LandingPage;

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ShieldIcon from "@mui/icons-material/Shield";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

const cardData = [
  {
    title: "100% Voluntary Donors",
    desc: "All donors are real and have joined voluntarily ",
    icon: VerifiedUserIcon,
  },
  {
    title: "Real Numbers, No Spam",
    desc: "Every phone number is verified with OTP to ensure authenticity.",
    icon: PhoneAndroidIcon,
  },
  {
    title: "Privacy & Respect First",
    desc: "We protect your data and only share it with your permission.",
    icon: PrivacyTipIcon,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [animateEmoji, setAnimateEmoji] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "50vh", md: "auto" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: { xs: "center" },
        }}
      >
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
              fontWeight: "semibold",
              px: 1,
            }}
            color="initial"
          >
            Find a donor or become one today – every drop matters.
          </Typography>
        </Stack>
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
            width: "70%",
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

      {/* What is blood bridge */}
      <Box
        sx={{
          mt: { md: 25, xs: 35 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant={isMobile ? "h4" : "h3"} color="text.secondary">
          What is Blood Bridge?
        </Typography>
        <Typography
          sx={{ width: { md: "55%", xs: "95%" }, mt: 5, textAlign: "center" }}
          variant={isMobile ? "h6" : "h5"}
          color="text.primary"
        >
          "Blood Bridge is a platform that acts as a bridge between blood donors
          and people who need blood. It helps connect them quickly and safely,
          especially in emergencies. All contact numbers are verified to ensure
          they are real and trustworthy,not spam. Our donors join voluntarily,
          understanding the true value of life and the importance of donating
          blood. They are always ready to help, making the process of finding
          and giving blood faster, easier, and more reliable."
        </Typography>
      </Box>

      {/* Cards / Features */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7,
          alignItems: "center",
          px: 2,
          py: 4,
          mt: { md: 20, xs: 15 },
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            mt: 10,
            gap: 2,
            display: "flex",
            alignItems: "center",
          }}
          color="text.secondary"
        >
          <ShieldIcon sx={{ fontSize: 40 }} />
          Why You Can Trust Us
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={10}
          justifyContent="center"
          alignItems="stretch"
          sx={{ width: "80%" }}
        >
          {cardData.map((card, idx) => (
            <Card
              key={idx}
              sx={{
                p: 3,
                flex: 1,
                textAlign: "center",
                borderRadius: 2,
                border: "1px solid red",
                // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                color: "#fff",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                },
              }}
            >
              <Box sx={{ mb: 2 }}>
                <card.icon sx={{ fontSize: 40, color: "primary.main" }} />
              </Box>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{}}
                  color="primary.main"
                  gutterBottom
                >
                  {card.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Mosafin SemBd', sans-serif",
                    textAlign: "center",
                  }}
                  variant="body2"
                  color="text.primary"
                >
                  {card.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Typography
        variant={isMobile ? "h4" : "h3"}
        color="text.secondary"
        gutterBottom
        sx={{
          mt: 10,
          gap: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <HandshakeIcon sx={{ fontSize: 40 }} />
        Two Ways to Join Blood Bridge
      </Typography>

      <Typography
        variant={isMobile ? "h6" : "h5"}
        color="text.primary"
        sx={{
          width: { md: "65%", xs: "95%" },
          mx: "auto",
          textAlign: "center",
          mt: 2,
        }}
      >
        There are two types of users on Blood Bridge,
        <span className="text-red-600 "> those looking for blood </span> and
        <span className="text-red-600 "> those who want to donate. </span>
        If you need blood, you can register and request help from nearby donors.
        If you're a donor, you can sign up to be notified when someone near you
        needs your blood type. It's simple, fast, and life-saving—choose your
        role and be part of the solution.
      </Typography>

      {/* Motivation Button */}
      <Box sx={{ mt: 10 }}>
        <Card
          sx={{
            borderRadius: 4,
            px: 2,
            textAlign: "center",
            boxShadow: "none",
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            color="text.secondary"
            gutterBottom
            sx={{
              mt: 10,
              gap: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BloodtypeIcon sx={{ fontSize: 40 }} />
            Become a Lifesaver
          </Typography>
          <Typography variant={isMobile ? "h6" : "h5"} mb={4}>
            Every drop counts. By becoming a donor, you have the power to save
            up to three lives with one donation.
          </Typography>
          <Button
            sx={{
              height: 40,
              fontWeight: "bold",
              fontSize: 15,
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              letterSpacing: "0.1em",
              minWidth: "160px",
              px: 4,
              gap: 1,
              color: "white",
            }}
            className="bg-gradient-primary"
            onClick={() => navigate(`/register`)}
          >
            Switch to Donor Mode
          </Button>
        </Card>
      </Box>
      {/* 24/7 support */}
      <Box sx={{ my: 10 }}>
        <Card
          sx={{
            borderRadius: 4,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "none",
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            color="text.secondary"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonSearchIcon sx={{ fontSize: 40 }} /> Can't find a donor?
          </Typography>

          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{ maxWidth: { md: "90%" }, textAlign: "center" }}
          >
            If you're unable to find a match, {!isMobile ? "" : <br />}
            Don’t worry our team will help contact local blood banks and try to
            arrange support on your behalf.
          </Typography>
          <Button
            sx={{
              height: 40,
              fontWeight: "bold",
              fontSize: 15,
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              letterSpacing: "0.1em",
              minWidth: "160px",
              px: 4,
              gap: 1,
              color: "white",
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
            className="bg-gradient-primary"
            onClick={() => navigate(`/register`)}
          >
            <Typography
              sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
              variant="body1"
            >
              Reach us at:{" "}
              <Typography
                component="span"
                color="text.primary"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "'Mosafin SemBd', sans-serif",
                }}
              >
                +91 98765 43210
              </Typography>
            </Typography>
          </Button>
        </Card>
      </Box>

      <Box
        sx={{
          mt: 6,
          py: { md: 7, xs: 5 },
          px: 2,
          textAlign: "center",
          width: "100%",
          position: "relative",
        }}
        className="bg-gradient-primary"
      >
        <div className="absolute h-full w-full  left-0 bottom-0 bg-[linear-gradient(to_right,#fffffe_1px,transparent_1px),linear-gradient(to_bottom,#fffffe_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.3]"></div>
        <Typography variant="h5" color="white">
          © {new Date().getFullYear()} BloodBridge. All rights reserved.
        </Typography>
        <Typography
          sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
          color="white"
          mt={1}
        >
          “The blood you donate gives someone another chance at life. Don’t
          wait—be someone’s miracle.”
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;

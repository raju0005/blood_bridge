import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import logo from "../assets/logo-removebg.png";
import useUserStore from "../zustand/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ToggleButton from "./GeneralComponents/ToggleButton";
import { Logout } from "@mui/icons-material";
import { useLogout, useSwitchToDonor } from "../api/usersApi";
import HamburgerNavBar from "./GeneralComponents/HamburgerNavBar";

const Header = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  const { logout, loading: isLoading } = useLogout();
  const { switchToDonor, loading: isloading } = useSwitchToDonor();

  useEffect(() => {
    if (location.pathname === "/home" && userInfo) {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  }, [location.pathname, !!userInfo]);

  const handleLogout = () => {
    logout();
    clearUserInfo();
    navigate("/");
  };

  const switchDonor = () => {
    switchToDonor({ isDonor: true });
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: showProfile ? "space-between" : "center",
          alignItems: "center",
        }}
      >
        {/* Logo on the left */}
        <Box
          component="img"
          alt="Logo"
          src={logo}
          sx={{
            width: { xs: "120px", md: "150px" },
            height: "auto",
            objectFit: "contain",
          }}
        />
        {showProfile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 3 },
            }}
          >
            {showProfile && !userInfo?.isDonor && (
              <ToggleButton switchDonor={switchDonor} />
            )}

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <HamburgerNavBar logout={handleLogout} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton color="primary" sx={{ p: 1 }}>
                <PersonIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton onClick={handleLogout} color="primary" sx={{ p: 1 }}>
                <Logout sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

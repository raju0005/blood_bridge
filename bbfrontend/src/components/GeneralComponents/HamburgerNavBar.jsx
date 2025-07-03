import { useState } from "react";
import {
  Box,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { Logout } from "@mui/icons-material";

const HamburgerNavBar = ({ logout }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleMenu = () => setOpen((prev) => !prev);
  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      {/* Top bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        color="red"
      >
        <IconButton onClick={toggleMenu} color="inherit">
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Hamburger Card */}
      {open && (
        <Card
          sx={{
            position: "absolute",
            top: 80,
            right: 5,
            width: 100,
            zIndex: 10,
            borderRadius: "0 0 0 12px",
            boxShadow: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
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
        </Card>
      )}
    </Box>
  );
};

export default HamburgerNavBar;

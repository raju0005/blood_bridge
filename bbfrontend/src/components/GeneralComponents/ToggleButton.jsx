import { useState } from "react";
import {
  FormControlLabel,
  FormGroup,
  styled,
  Switch,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {},
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#f55151", // Red when ON
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#ff0000",
    width: 20,
    height: 20,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be", // Gray when OFF
    borderRadius: 20 / 2,
  },
}));

const ToggleButton = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (event) => {
    setChecked(event.target.checked);
    
    setTimeout(() => {
      navigate("/donor_application");
    }, 500);
  };

  return (
    <FormGroup>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography sx={{ fontSize: { xs: 14, md: 20 } }} color="primary">
          Become a Donor
        </Typography>
        <FormControlLabel
          control={
            <MaterialUISwitch
              checked={checked}
              onChange={handleToggle}
              sx={{
                my: 1,
                width: { xs: 40, sm: 62 },
                height: { xs: 24, sm: 34 },
                "& .MuiSwitch-switchBase": {
                  transform: { xs: "translateX(4px)", sm: "translateX(6px)" },
                  "&.Mui-checked": {
                    transform: {
                      xs: "translateX(16px)",
                      sm: "translateX(22px)",
                    },
                  },
                },
                "& .MuiSwitch-thumb": {
                  width: { xs: 20, sm: 32 },
                  height: { xs: 20, sm: 32 },
                },
              }}
            />
          }
        />
      </Box>
    </FormGroup>
  );
};

export default ToggleButton;

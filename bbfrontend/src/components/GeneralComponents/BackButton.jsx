import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BackButton = () => {
  const navigate = useNavigate();
  const location=useLocation();

  

  return (
    <Button
      sx={{
        position: "absolute",
        top: { md: 100, xs: 90 },
        left: { xs: 20, md: 30 },
      }}
      startIcon={<KeyboardBackspaceIcon />}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackButton;

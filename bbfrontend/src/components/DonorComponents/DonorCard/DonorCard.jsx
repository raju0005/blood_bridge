import { Box, Typography } from "@mui/material";
import DonorDetailsDialog from "./DonorDetailsDialog";

const DonorCard = ({ donor }) => {
  return (
    <Box
      sx={{
        display: { md: "flex", xs: "grid" },
        gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "none" },
        width: "83%",
        justifyContent: { md: "space-around" },
        alignItems: "center",
        px: 4,
        py: 3,
        borderRadius: "10px",
        gap: 2,
        flexWrap: "wrap",
        textAlign: { xs: "center", md: "left" },
        bgcolor: "white",
        boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <Box
        component="img"
        alt={donor?.userId?.username || "Donor"}
        src={donor?.profilePicture}
        sx={{
          width: { xs: "70px", md: "90px" },
          height: { xs: "70px", md: "90px" },
          objectFit: "cover",
          borderRadius: "50%",
          border: "1px solid #ff0000",
          gridColumn: { xs: "span 2", md: "auto" },
          justifySelf: "center",
          alignSelf: "center",
        }}
      />
      {[
        { label: "Name", value: donor?.userId?.username },
        { label: "Blood Group", value: donor?.bloodGroup },
        { label: "City", value: donor?.city },
        { label: "State", value: donor?.state },
      ].map((item, idx) => (
        <Box
          key={idx}
          sx={{
            flex: 1,
            minWidth: "120px",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            {item.label}
          </Typography>
          <Typography
            sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
            variant="subtitle1"
            color="text.primary"
          >
            {item.value}
          </Typography>
        </Box>
      ))}

      <Box
        sx={{
          flex: 1,
          minWidth: "120px",
          textAlign: "center",
          gridColumn: { xs: "span 2", md: "auto" },
          justifySelf: "center",
          alignSelf: "center",
        }}
      >
        <DonorDetailsDialog userId={donor.userId._id} />
      </Box>
    </Box>
  );
};

export default DonorCard;

import { Box, Typography } from "@mui/material";
import DonorCard from "./DonorCard/DonorCard";
import Loader from "../Loader";

const DonorList = ({ donors, isLoading }) => {
  if (isLoading) return <Loader />;
  console.log(donors);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 4,
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "50px",
        marginTop: "40px",
      }}
    >
      {donors && donors.length > 0 ? (
        donors?.map((donor, index) => (
          <DonorCard key={donor?.userId._id} donor={donor} />
        ))
      ) : (
        <Typography variant="h5" color="text.primary">
          No Donors found.
        </Typography>
      )}
    </Box>
  );
};
export default DonorList;

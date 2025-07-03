import { Box } from "@mui/material";
import DonorCard from "./DonorCard/DonorCard";

const DonorList = ({ donors, isLoading }) => {
  if (isLoading) return <div>Loading...</div>;
  console.log(donors);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap:4,
        flexDirection: "column",
        alignItems: "center",
        borderRadius:'50px',
        marginTop:'40px'
      }}
    >
      {donors?.map((donor, index) => (
        <DonorCard key={donor?.userId._id} donor={donor} />
      ))}
      {donors?.map((donor, index) => (
        <DonorCard key={donor?.userId._id} donor={donor} />
      ))}
      {donors?.map((donor, index) => (
        <DonorCard key={donor?.userId._id} donor={donor} />
      ))}
      {donors?.map((donor, index) => (
        <DonorCard key={donor?.userId._id} donor={donor} />
      ))}
      {donors?.map((donor, index) => (
        <DonorCard key={donor?.userId._id} donor={donor} />
      ))}
      {donors?.map((donor, index) => (
        <DonorCard key={donor?.userId._id} donor={donor} />
      ))}
    </Box>
  );
};
export default DonorList;

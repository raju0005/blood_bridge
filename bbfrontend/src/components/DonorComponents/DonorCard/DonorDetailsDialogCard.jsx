import { Box, Typography, CircularProgress, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { useGetDonorById } from "../../../api/donorsApi";
const DonorDetailsDialogCard = ({ userId }) => {
  const {
    data: donorData,
    loading: isLoading,
    error: isError,
  } = useGetDonorById(userId);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError || !donorData) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="error">
          Failed to load donor data.
        </Typography>
      </Box>
    );
  }

  const getRecentDonationInfo = () => {
    if (!donorData?.dateOfLastDonation) {
      return (
        <Typography variant="body2" color="textSecondary">
          No previous donation record
        </Typography>
      );
    }

    const lastDonationDate = new Date(donorData?.dateOfLastDonation);
    const currentDate = new Date();
    const diffDays = Math.floor(
      (currentDate - lastDonationDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 7)
      return (
        <Typography
          variant="caption"
          sx={{ fontFamily: "'Mosafin SemBd',sans-serif" }}
        >
          Last donated {diffDays} days ago
        </Typography>
      );
    if (diffDays < 30)
      return (
        <Typography
          variant="caption"
          sx={{ fontFamily: "'Mosafin SemBd',sans-serif" }}
        >
          Last donated {Math.floor(diffDays / 7)} week(s) ago
        </Typography>
      );
    if (diffDays < 365)
      return (
        <Typography
          variant="caption"
          sx={{ fontFamily: "'Mosafin SemBd',sans-serif" }}
        >
          Last donated {Math.floor(diffDays / 30)} month(s) ago
        </Typography>
      );

    return (
      <Typography
        variant="caption"
        sx={{ fontFamily: "'Mosafin SemBd',sans-serif" }}
      >
        Last donated {Math.floor(diffDays / 365)} year(s) ago
      </Typography>
    );
  };

  const renderInfoBox = (label, value) => (
    <Box
      sx={{
        width: { xs: "100%", sm: "45%", md: "30%" },
        mb: 2,
      }}
    >
      <Typography variant="subtitle2" color="textSecondary">
        {label}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "'Mosafin SemBd', sans-serif",
        }}
      >
        {value || "N/A"}
      </Typography>
    </Box>
  );

  return (
    <Box px={{ xs: 2, md: 4 }} py={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          gap: 4,
        }}
      >
        {/* Profile + Recent Donation */}
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src={donorData?.profilePicture}
            alt="Profile"
            sx={{
              width: 160,
              height: 160,
              objectFit: "cover",
              borderRadius: 3,
              border: 2,
              borderColor: "red",
              mb: 1,
            }}
          />
          {getRecentDonationInfo()}
        </Box>

        {/* Info Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: { xs: "center", md: "flex-start" },
            width: "100%",
          }}
        >
          {renderInfoBox("Name", donorData?.username)}
          {renderInfoBox("Email", donorData?.email)}
          {renderInfoBox("Phone", donorData?.phonenumber)}
          {renderInfoBox("Age", donorData?.age)}
          {renderInfoBox("Gender", donorData?.gender)}
          {renderInfoBox("Blood Group", donorData?.bloodGroup)}
          {renderInfoBox(
            "Last Donation Date",
            donorData?.dateOfLastDonation
              ? new Date(donorData.dateOfLastDonation).toLocaleDateString()
              : "N/A"
          )}
          {renderInfoBox("Address", donorData?.address)}
          {renderInfoBox("City", donorData?.city)}
          {renderInfoBox("State", donorData?.state)}
        </Box>
      </Box>

      {/* Contact Button */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          size="large"
          href={`tel:${donorData?.phonenumber}`}
          sx={{
            minWidth: { xs: "80%", md: 300 },
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          }}
          className="bg-gradient-primary"
          startIcon={<PhoneIcon />}
        >
          Contact
        </Button>
      </Box>
    </Box>
  );
};

export default DonorDetailsDialogCard;

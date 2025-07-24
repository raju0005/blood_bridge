import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../utils/yupSchemas";
import toast from "react-hot-toast";
import useUserStore from "../zustand/store";
import { useGetProfile, UseUpdateProfile } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const { data: profileData, loading: isLoading } = useGetProfile();
  const { updateProfile, loading: updating } = UseUpdateProfile();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (profileData) {
      if (!profileData.user.isDonor) {
        navigate("/home");
      }
      const donor = profileData?.donor || {};

      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toISOString().split("T")[0];
      };
      reset({
        username: profileData?.user.username,
        phonenumber: profileData?.user.phonenumber,
        dateofBirth: formatDate(donor.dateofBirth) || "",
        gender: donor.gender || "",
        city: donor.city || "",
        state: donor.state || "",
        bloodGroup: donor.bloodGroup || "",
        dateOfLastDonation: formatDate(donor.dateOfLastDonation) || "",
        address: donor.address || "",
        profilePicture: donor.profilePicture || "",
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (formValues) => {
    try {
      const formData = new FormData();
      formData.append("dateOfLastDonation", formValues.dateOfLastDonation);

      if (formValues.profilePicture instanceof File) {
        formData.append("profilePicture", formValues.profilePicture);
      }

      await updateProfile(formData);
      toast.success("Profile updated successfully");
      setIsEdit(false);
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center h-full">
        {" "}
        <Loader />
      </div>
    );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        mt: { xs: 5, md: 10 },
        px: { xs: 2, md: 6 },
        position: "relative",
      }}
    >
      {/* Edit Button */}
      <Button
        variant="outlined"
        size="small"
        startIcon={isEdit ? <CloseIcon /> : <EditIcon />}
        onClick={() => setIsEdit((prev) => !prev)}
        sx={{
          position: "absolute",
          top: { xs: 0, md: -60 },
          right: { xs: 20, md: 30 },
          zIndex: 10,
        }}
      >
        {isEdit ? "Cancel" : "Edit"}
      </Button>

      {/* Profile Picture */}
      <Box
        sx={{
          width: { md: "30%", xs: "83%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* Image container with relative positioning for icon */}
        <Box sx={{ position: "relative", width: 160, height: 160 }}>
          <Box
            component="img"
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : profileData?.donor?.profilePicture || ""
            }
            alt="Profile"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 3,
              border: 2,
              borderColor: "red",
            }}
          />

          {/* Edit (select photo) icon */}
          {isEdit && (
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                bgcolor: "white",
                boxShadow: 1,
                "&:hover": { bgcolor: "#eee" },
              }}
            >
              <EditIcon className="text-red-500" fontSize="small" />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedFile(file); // ✅ needed to show filename
                    setValue("profilePicture", file, { shouldValidate: true });
                  }
                }}
              />
            </IconButton>
          )}
        </Box>

        {/* Show selected file name with delete icon */}
        {selectedFile && isEdit && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 0.5,
            }}
          >
            <Typography variant="body2">{selectedFile.name}</Typography>
            <IconButton
              color="error"
              size="small"
              onClick={() => {
                setSelectedFile(null);
                setValue("profilePicture", null);
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* Validation error */}
        {errors.profilePicture && (
          <Typography variant="caption" color="error">
            {errors.profilePicture?.message}
          </Typography>
        )}
      </Box>

      {/* Profile Form */}
      {profileData?.user.isDonor && (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            flex: 1,
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          }}
        >
          {[
            { name: "username", label: "User name" },
            { name: "phonenumber", label: "Phone Number" },
            { name: "dateofBirth", label: "Date of Birth" },
            { name: "gender", label: "Gender" },
            { name: "bloodGroup", label: "Blood Group" },
            { name: "city", label: "City" },
            { name: "state", label: "State" },
            { name: "address", label: "Address", multiline: true },
          ].map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              render={({ field: f }) => (
                <TextField
                  {...f}
                  label={field.label}
                  type={field.type || "text"}
                  fullWidth
                  multiline={field.multiline}
                  slotProps={{
                    input: {
                      readOnly: true,
                      sx: {
                        pointerEvents: "none",
                        "& .MuiOutlinedInput-notchedOutline": {},
                        color: "black",
                      },
                    },
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              )}
            />
          ))}

          {/* Editable Field: Last Donation Date */}
          <Controller
            name="dateOfLastDonation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="Last Donation Date"
                fullWidth
                slotProps={{
                  input: !isEdit
                    ? {
                        readOnly: true,
                        sx: {
                          pointerEvents: "none",
                          "& .MuiOutlinedInput-notchedOutline": {},
                          color: "black",
                        },
                      }
                    : {},
                  inputLabel: {
                    shrink: true,
                  },
                }}
                error={!!errors.dateOfLastDonation}
                helperText={errors.dateOfLastDonation?.message}
              />
            )}
          />

          {/* Submit Button */}
          {isEdit && (
            <Box
              sx={{
                gridColumn: { xs: "span 2", md: "span 3" },
                mt: 2,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                  height: 50,
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: "0.1em",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  gap: 2,
                  minWidth: "160px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
                className="bg-gradient-primary"
              >
                <span
                  className={`${
                    updating ? "text-hide" : ""
                  } transition-opacity duration-400 ease-in-out`}
                >
                  Update
                </span>
                <span
                  className={`${
                    updating ? "emoji-drive" : ""
                  } block transform transition-transform text-2xl`}
                >
                  🚑
                </span>
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;

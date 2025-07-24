import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../utils/yupSchemas";
import { useNavigate } from "react-router";
import { State, City } from "country-state-city";
import toast from "react-hot-toast";
import useUserStore from "../zustand/store";
import { useGetProfile, UseUpdateProfile } from "../api/usersApi";

const ProfilePage = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const COUNTRY_CODE = "IN";
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);

  const { data: profileData, loading: loadingProfile } = useGetProfile();
  const { updateProfile, loading: updating } = UseUpdateProfile();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const selectedState = watch("state");
  const selectedFile = watch("profilePicture");

  useEffect(() => {
    const fetchedStates = State.getStatesOfCountry(COUNTRY_CODE);
    setStates(fetchedStates);

    if (userInfo.isDonor) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    const selected = states.find((state) => state.name === selectedState);
    if (selected) {
      const fetchedCities = City.getCitiesOfState(
        COUNTRY_CODE,
        selected.isoCode
      );
      setCities(fetchedCities);
    } else {
      setCities([]);
    }
  }, [selectedState, states]);

  useEffect(() => {
    if (profileData) {
      const donor = profileData?.donor || {};
      reset({
        dateofBirth: donor.dateofBirth || "",
        gender: donor.gender || "",
        city: donor.city || "",
        state: donor.state || "",
        bloodGroup: donor.bloodGroup || "",
        dateOfLastDonation: donor.dateOfLastDonation || "",
        address: donor.address || "",
        profilePicture: null, // keep empty unless uploading
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (formValues) => {
    try {
      const formData = new FormData();
      for (const key in formValues) {
        if (key === "profilePicture" && formValues[key]) {
          formData.append(key, formValues[key]);
        } else {
          formData.append(key, formValues[key]);
        }
      }

      await updateProfile(formData);
      toast.success("Profile updated successfully.");
      setIsEdit(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const genders = ["Male", "Female", "Other"];

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
        mt: 5,
        mb: 2,
      }}
    >
      <Button
        variant="outlined"
        size="small"
        startIcon={isEdit ? <CloseIcon /> : <EditIcon />}
        sx={{ position: "absolute", top: 100, right: { md: 100, xs: 30 } }}
        onClick={() => setIsEdit((prev) => !prev)}
      >
        {isEdit ? "Cancel" : "Edit"}
      </Button>

      {/* Profile Picture Section */}
      <Box
        sx={{
          width: { md: "30%", xs: "83%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {selectedFile ? (
          <Box
            component="img"
            src={URL.createObjectURL(selectedFile)}
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
        ) : profileData?.donor?.profilePicture ? (
          <Box
            component="img"
            src={profileData.donor.profilePicture}
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
        ) : (
          <Box
            sx={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              mt: 5,
            }}
          >
            No Image
          </Box>
        )}

        <Button
          variant="outlined"
          sx={{
            border: "2px dashed",
            width: "100%",
            height: "56px",
            justifyContent: "center",
            gap: 1,
            mt: 4,
          }}
          component="label"
          disabled={!isEdit}
        >
          <AddIcon size={10} />
          Upload Profile Picture
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              if (!isEdit) return;
              setValue("profilePicture", e.target.files[0], {
                shouldValidate: true,
              });
            }}
          />
        </Button>
        {selectedFile && (
          <Typography variant="body2" mt={1}>
            {selectedFile.name}
          </Typography>
        )}
        {errors.profilePicture && (
          <Typography variant="caption" color="error">
            {errors.profilePicture?.message}
          </Typography>
        )}
      </Box>

      {/* Form Section */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        sx={{
          display: { md: "grid", xs: "flex" },
          flexDirection: "column",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          width: { md: "50%", xs: "83%" },
        }}
      >
        {/* Date of Birth */}
        <Controller
          name="dateofBirth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              fullWidth
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              disabled={!isEdit}
              error={!!errors.dateofBirth}
              helperText={errors.dateofBirth?.message}
            />
          )}
        />

        {/* Gender */}
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select {...field} label="Gender" disabled={!isEdit}>
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="error">
                {errors.gender?.message}
              </Typography>
            </FormControl>
          )}
        />

        {/* Blood Group */}
        <Controller
          name="bloodGroup"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.bloodGroup}>
              <InputLabel>Blood Group</InputLabel>
              <Select {...field} label="Blood Group" disabled={!isEdit}>
                {bloodGroups.map((b) => (
                  <MenuItem key={b} value={b}>
                    {b}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="error">
                {errors.bloodGroup?.message}
              </Typography>
            </FormControl>
          )}
        />

        {/* Last Donation */}
        <Controller
          name="dateOfLastDonation"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              fullWidth
              label="Last Donation"
              InputLabelProps={{ shrink: true }}
              disabled={!isEdit}
              error={!!errors.dateOfLastDonation}
              helperText={errors.dateOfLastDonation?.message}
            />
          )}
        />

        {/* Address */}
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              multiline
              minRows={2}
              fullWidth
              disabled={!isEdit}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{ gridColumn: "span 2" }}
            />
          )}
        />

        {/* City */}
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.city} disabled={!selectedState || !isEdit}>
              <InputLabel>City</InputLabel>
              <Select {...field} label="City">
                {cities.map((city) => (
                  <MenuItem key={city.name} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="error">
                {errors.city?.message}
              </Typography>
            </FormControl>
          )}
        />

        {/* State */}
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.state} disabled={!isEdit}>
              <InputLabel>State</InputLabel>
              <Select
                {...field}
                label="State"
                onChange={(e) => {
                  field.onChange(e);
                  setValue("city", ""); // reset city on state change
                }}
              >
                {states.map((state) => (
                  <MenuItem key={state.isoCode} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="error">
                {errors.state?.message}
              </Typography>
            </FormControl>
          )}
        />

        {/* Submit */}
        {isEdit && (
          <Box
            sx={{
              gridColumn: "span 3",
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={updating}
              sx={{ px: 5, py: 1.5, fontWeight: "bold" }}
            >
              {updating ? "Saving..." : "Update"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;

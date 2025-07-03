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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { donorApplicationSchema } from ".././utils/yupSchemas";
import { useNavigate } from "react-router";
import { State, City } from "country-state-city";
import { useCreateDonor } from "../api/donorsApi";
import toast from "react-hot-toast";
import useUserStore from "../zustand/store";

const DonorApplication = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const COUNTRY_CODE = "IN";

  const userInfo = useUserStore((state) => state.userInfo);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(donorApplicationSchema),
  });

  const selectedState = watch("state");

  //getting States by Country Code
  useEffect(() => {
    const fetched_states = State.getStatesOfCountry(COUNTRY_CODE);
    setStates(fetched_states);
  }, []);

  //getting Cities by State ISO CODE
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

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const genders = ["Male", "Female", "Other"];
  const selectedFile = watch("profilePicture");

  const { createDonor, loading: isLoading, error } = useCreateDonor();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting", data.profilePicture);

      const formData = new FormData();
      formData.append("dateofBirth", data.dateofBirth);
      formData.append("gender", data.gender);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("bloodGroup", data.bloodGroup);
      formData.append("dateOfLastDonation", data.dateOfLastDonation);
      formData.append("address", data.address);
      formData.append("profilePicture", data.profilePicture);
      formData.append("userId", userInfo._id);
      const result = await createDonor(formData);
      console.log(result);
      toast.success(
        "Application received! Heroes don’t wear capes—they donate blood"
      );
      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (error) {
      console.error("Submit error:", error);
      toast(`Error submitting application: ${error.message}`, {
        duration: 2000,
      });
    }
  };

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
      <Box sx={{ width: { md: "30%", xs: "83%" } }}>
        <Typography variant="h3" mb={3} color="text.secondary" textAlign="left">
          Be someone’s miracle today.
        </Typography>
        <Typography variant="h4" mb={3} textAlign="left">
          Fill out the form.{" "}
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          display: { md: "grid", xs: "flex" },
          flexDirection: "column",
          gridTemplateColumns: {
            md: "repeat(3, 1fr)",
          },
          gap: 2,
          width: { md: "50%", xs: "83%" },
        }}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {/* Date of Birth */}
        <Controller
          name="dateofBirth"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "15px",
                  letterSpacing: "0.1em",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "15px",
                  fontFamily: "'Mosafin SemBd', sans-serif",
                  letterSpacing: "0.1em",
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
              fullWidth
              label="Date of Birth"
              type="date"
              margin="normal"
              error={!!errors.dateofBirth}
              helperText={errors.dateofBirth?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          )}
        />

        {/* Gender */}
        <FormControl
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "15px",
              letterSpacing: "0.1em",
            },
            "& .MuiOutlinedInput-root": {
              fontSize: "15px",
              fontFamily: "'Mosafin SemBd', sans-serif",
              letterSpacing: "0.1em",
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
          fullWidth
          margin="normal"
          error={!!errors.gender}
        >
          <InputLabel>Gender</InputLabel>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Gender">
                {genders.map((gender) => (
                  <MenuItem
                    sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
                    key={gender}
                    value={gender}
                  >
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography variant="caption" color="error">
            {errors.gender?.message}
          </Typography>
        </FormControl>

        {/* Blood Group */}
        <FormControl
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "15px",
              letterSpacing: "0.1em",
            },
            "& .MuiOutlinedInput-root": {
              fontSize: "15px",
              letterSpacing: "0.1em",
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
          fullWidth
          margin="normal"
          error={!!errors.bloodGroup}
        >
          <InputLabel>Blood Group</InputLabel>
          <Controller
            name="bloodGroup"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Blood Group">
                {bloodGroups.map((bg) => (
                  <MenuItem
                    sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
                    key={bg}
                    value={bg}
                  >
                    {bg}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography variant="caption" color="error">
            {errors.bloodGroup?.message}
          </Typography>
        </FormControl>

        {/* Last Date of Donation */}
        <Controller
          name="dateOfLastDonation"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "15px",
                  letterSpacing: "0.1em",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "15px",
                  fontFamily: "'Mosafin SemBd', sans-serif",
                  letterSpacing: "0.1em",
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
              fullWidth
              label="Last Date of Donation"
              type="date"
              margin="normal"
              error={!!errors.dateOfLastDonation}
              helperText={errors.dateOfLastDonation?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          )}
        />
        {/* Address */}
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={{
                gridColumn: "span 2",
                "& .MuiInputLabel-root": {
                  fontSize: "15px",
                  letterSpacing: "0.1em",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "15px",
                  fontFamily: "'Mosafin SemBd', sans-serif",
                  letterSpacing: "0.1em",
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
              error={!!errors.address}
              helperText={errors.address?.message}
              label="Address"
              multiline
              minRows={2}
              variant="outlined"
              fullWidth
            />
          )}
        />

        {/* State */}
        <Controller
          name="state"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl
              fullWidth
              margin="normal"
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "15px",
                  letterSpacing: "0.1em",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "15px",
                  fontFamily: "'Mosafin SemBd', sans-serif",
                  letterSpacing: "0.1em",
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
              error={!!errors.state}
            >
              <InputLabel>State</InputLabel>
              <Select
                {...field}
                label="State"
                onChange={(e) => {
                  field.onChange(e);
                  setValue("city", ""); // reset city when state changes
                }}
              >
                {states.map((state) => (
                  <MenuItem
                    sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
                    key={state.isoCode}
                    value={state.name}
                  >
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

        {/* City */}
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl
              fullWidth
              margin="normal"
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "15px",
                  letterSpacing: "0.1em",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "15px",
                  fontFamily: "'Mosafin SemBd', sans-serif",
                  letterSpacing: "0.1em",
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
              error={!!errors.city}
            >
              <InputLabel>City</InputLabel>
              <Select {...field} label="City" disabled={!cities.length}>
                {cities.map((city) => (
                  <MenuItem
                    sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
                    key={city.name}
                    value={city.name}
                  >
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

        {/* Profile Picture Upload */}
        <Box
          sx={{
            gridColumn: "span 3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              border: "2px dashed",
              width: "100%",
              height: "56px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
            component="label"
          >
            <AddIcon size={10} />
            Upload Profile Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                setValue("profilePicture", e.target.files[0], {
                  shouldValidate: true,
                });
              }}
            />
          </Button>
          {selectedFile && (
            <Typography
              variant="body2"
              sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
              mt={1}
            >
              {selectedFile.name}
            </Typography>
          )}
          {errors.profilePicture && (
            <Typography variant="caption" color="error">
              {errors.profilePicture?.message}
            </Typography>
          )}
        </Box>

        {/* Submit Button */}
        <Box
          sx={{
            gridColumn: "span 3",
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            className="bg-gradient-primary"
            type="submit"
            size="large"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DonorApplication;

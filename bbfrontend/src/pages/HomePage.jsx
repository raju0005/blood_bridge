import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { State, City } from "country-state-city";
import { useEffect, useState } from "react";
import DonorList from "../components/DonorComponents/DonorList";
import { useGetDonors } from "../api/donorsApi";
import useUserStore from "../zustand/store";
import { useGetMe } from "../api/usersApi";

const HomePage = () => {
  // const [logout] = useLogoutMutation();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    selectedCity: "Bhimavaram",
    selectedState: "Andhra Pradesh",
    bloodGroup: "A+",
  });
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-"];

  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const { data: donors, loading: isLoading } = useGetDonors(
    {
      selectedCity: filters.selectedCity,
      bloodGroup: encodeURIComponent(filters.bloodGroup),
    },
    { skip: !filters.selectedCity || !filters.bloodGroup }
  );
  const { data: user, loading } = useGetMe();

  const COUNTRY_CODE = "IN";
  //getting States by Country Code
  useEffect(() => {
    const fetched_states = State.getStatesOfCountry(COUNTRY_CODE);
    setStates(fetched_states);
  }, []);

  //getting Cities by State ISO CODE
  useEffect(() => {
    const selected = states.find(
      (state) => state.name === filters.selectedState
    );
    if (selected) {
      const fetchedCities = City.getCitiesOfState(
        COUNTRY_CODE,
        selected.isoCode
      );
      setCities(fetchedCities);
    } else {
      setCities([]);
    }
  }, [filters.selectedState, states]);

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user, setUserInfo]);

  const handleChange = (field) => (event) => {
    setFilters((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "40px",
          width: "100%",
          marginTop: { xs: "100px", md: "50px" },
        }}
      >
        <Box sx={{ width: "83%" }}>
          <Typography variant="h4" color="text.primary">
            Every Drop Counts,
          </Typography>
          <Typography variant="h3" color="text.secondary">
            Let&rsquo;s find the match.
          </Typography>
        </Box>
        <Box
          sx={{
            marginX: "auto",
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            width: "100%",
            justifyContent: "space-around",
            alignItems: { md: "flex-start", xs: "center" },
            gap: { xs: "20px", md: "0" },
          }}
        >
          <FormControl
            sx={{
              width: { md: "30ch", xs: "40ch" },
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
          >
            <InputLabel id="state-select-label">Select State</InputLabel>
            <Select
              labelId="state-select-label"
              id="state-select"
              value={filters.selectedState}
              label="Select State"
              onChange={handleChange("selectedState")}
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
          </FormControl>
          <FormControl
            sx={{
              width: { md: "30ch", xs: "40ch" },
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
          >
            <InputLabel id="city-select-label">Select City</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={filters.selectedCity}
              label="Select City"
              onChange={handleChange("selectedCity")}
              disabled={!filters.selectedState}
            >
              {filters.selectedState && cities ? (
                cities.map((city) => (
                  <MenuItem
                    sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
                    key={city.name}
                    value={city.name}
                  >
                    {city.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="No Cities">No Cities</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              width: { md: "30ch", xs: "40ch" },
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
          >
            <InputLabel id="bloodGroup-select-label">
              Select Blood Group
            </InputLabel>
            <Select
              labelId="bloodGroup-select-label"
              id="bloodGroup-select"
              value={filters.bloodGroup}
              label="Select Blood Group"
              onChange={handleChange("bloodGroup")}
            >
              {bloodGroups.map((bloodGroup) => (
                <MenuItem
                  sx={{ fontFamily: "'Mosafin SemBd', sans-serif" }}
                  key={bloodGroup}
                  value={bloodGroup}
                >
                  {bloodGroup}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {donors && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginY: "100px",
          }}
        >
          <Box sx={{ width: "83%" }}>
            <Typography variant="h3" color="text.secondary">
              Donors in {filters.selectedCity}
            </Typography>
            <Typography variant="h4" color="text.primary">
              For Blood Group {filters.bloodGroup}
            </Typography>
          </Box>
          <DonorList donors={donors} isLoading={isLoading} />
        </Box>
      )}
    </>
  );
};
export default HomePage;

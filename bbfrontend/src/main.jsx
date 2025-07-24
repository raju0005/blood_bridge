// index.js

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";
import "./index.css";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import WelcomePage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import DonorApplication from "./pages/DonorApplication.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#ff0000",
    },
    text: {
      primary: "#000000",
      secondary: "#ff0000",
      other: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Sauber', sans-serif",
    h1: {
      color: "#ff0000",
    },
    h2: {
      color: "#ff0000",
    },
    button: {
      color: "#ffffff", //
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/donor_application" element={<DonorApplication />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/donor/:userId" element={<DonorDetailsPage />} /> */}
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

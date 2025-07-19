import { useState, useEffect } from "react";
import axiosApi from "./axiosApi";
import { auth } from "../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";

export const usePhoneAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);

  const sendOtp = async (rawPhone) => {
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("Recaptcha resolved"),
          "expired-callback": () =>
            toast.error("Recaptcha expired. Try again."),
        }
      );

      const phone = "+91" + rawPhone.replace(/^0+/, "").replace(/\D/g, "");
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      toast.success("OTP sent successfully");
      return true;
    } catch (err) {
      console.error("OTP send error:", err);
      toast.error(err.message || "Failed to send OTP");
      return false;
    }
  };

  const verifyOtp = async (otp) => {
    if (!confirmationResult) {
      toast.error("Please send OTP first.");
      return null;
    }

    setIsOtpVerifying(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();
      toast.success("OTP verified!");
      return { token: idToken, phoneNumber: result.user.phoneNumber };
    } catch (err) {
      console.error("OTP verification error:", err);
      toast.error("Invalid OTP");
      return null;
    } finally {
      setIsOtpVerifying(false);
    }
  };

  return {
    sendOtp,
    verifyOtp,
    otpSent,
    isLoading,
    isOtpVerifying,
  };
};

export const useRegister = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async ({ username, phonenumber, idToken }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosApi.post("/user/register", {
        username,
        phonenumber,
        idToken,
      });
      setData(res.data);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { register, data, loading, error };
};

export const useLogin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ phonenumber, idToken }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosApi.post("user/login", {
        phonenumber,
        idToken,
      });
      setData(res.data);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { login, data, loading, error };
};

export const getMe = async () => {
  try {
    const res = await axiosApi.get("/user/getMe");
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
};

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosApi.post("/user/logout");
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};

export const useGetMe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axiosApi.get("/user/getMe");
        setData(res.data);
      } catch (err) {
        const message = err.response?.data?.message || "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return { data, loading, error };
};

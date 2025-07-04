import { useState, useEffect } from "react";
import axiosApi from "./axiosApi";

export const useRegister = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async ({
    username,
    phonenumber,
    email,
    password,
    isDonor,
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosApi.post("/user/register", {
        username,
        phonenumber,
        email,
        password,
        isDonor,
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

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosApi.post("/user/login", {
        email,
        password,
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

export const useSwitchToDonor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const switchToDonor = async ({ isDonor }) => {
    setLoading(true);
    try {
      const res = await axiosApi.patch("/user/changeDonor", { isDonor });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, switchToDonor, error };
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

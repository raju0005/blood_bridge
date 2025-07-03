import { useState, useEffect } from "react";
import axiosApi from "./axiosApi";

export const useGetDonors = ({ selectedCity, bloodGroup }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDonors = async () => {
      setLoading(true);
      try {
        const res = await axiosApi.get(
          `donors/getDonors?city=${selectedCity}&bloodGroup=${bloodGroup}`
        );

        setData(res.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
      setLoading(false);
    };

    if (selectedCity && bloodGroup) {
      getDonors();
    }
  }, [selectedCity, bloodGroup]);

  return { data, loading };
};

export const useGetDonorById = (donorId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDonorById = async () => {
      setLoading(true);
      try {
        const res = await axiosApi.get(`donors/${donorId}`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching donor by ID:", error);
      }
      setLoading(false);
    };

    if (donorId) {
      getDonorById();
    }
  }, [donorId]);

  return { data, loading };
};

export const useCreateDonor = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const createDonor = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosApi.post("/donors/createDonor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createDonor, loading, data, error };

};





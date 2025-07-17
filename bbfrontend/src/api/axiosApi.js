// api/axios.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosApi = axios.create({
  baseURL: "/api/bb",
  withCredentials: true,
});

export default axiosApi;

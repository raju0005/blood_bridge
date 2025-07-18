// api/axios.js
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

const axiosApi = axios.create({
  baseURL: URL, 
  withCredentials: true,
});

export default axiosApi;

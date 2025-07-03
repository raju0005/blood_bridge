// api/axios.js
import axios from "axios";

const axiosApi = axios.create({
  baseURL: "/api/bb",
  withCredentials: true,
});

export default axiosApi;

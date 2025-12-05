import axios from "axios";

const token = localStorage.getItem("adminToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;

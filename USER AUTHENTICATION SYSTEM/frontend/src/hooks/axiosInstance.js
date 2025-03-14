import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/v1/user",
  withCredentials: true, // Important to send cookies
});

export default axiosInstance;

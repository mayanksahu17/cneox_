import axios from "axios";
import baseURL from "../constants/baseURL";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = JSON.parse(localStorage.getItem("crown_admin")) || "";

    config.headers.Authorization = `${authToken.token}`;
    // console.log(authToken, authToken.token);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("crown_admin");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

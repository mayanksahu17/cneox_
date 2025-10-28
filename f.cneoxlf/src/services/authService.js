import axios from "axios";
import { baseURL } from "../constants/baseURL";

const signUpUser = async (data) => {
  return axios.post(`${baseURL}/auth/signup`, data);
};

const sendVerificationEmail = async (data) => {
  return axios.post(`${baseURL}/email/verify`, data);
};

const loginUser = async (data) => {
  return axios.post(`${baseURL}/auth/signin`, data);
};

const sendLoginOTP = async (data) => {
  return axios.post(`${baseURL}/auth/login-otp`, data);
};

const verifyUserEmail = async (data) => {
  return axios.post(`${baseURL}/auth/verify`, data);
};

const sendForgotPasswordOTP = async (data) => {
  return axios.post(`${baseURL}/auth/forgot-password`, data);
};

const resetForgotPassword = async (data) => {
  return axios.post(`${baseURL}/auth/forgot-password-reset`, data);
};
const userLoginAdmin = async (data) => {
  return axios.post(`${baseURL}/admin/user-signin`, data);
};
const authService = {
  signUpUser,
  sendVerificationEmail,
  loginUser,
  verifyUserEmail,
  sendForgotPasswordOTP,
  resetForgotPassword,
  sendLoginOTP,
  userLoginAdmin,
};

export default authService;

import axios from "./axios";

const sentOTP = (user) => {
  return axios.post("/email/otp", {
    email: user?.user?.email,
  });
};

const createWithdrawal = (user, data) => {
  return axios.post("/withdrawal/create_withdrawal", {
    ...data,
    email: user?.user?.email,
  });
};

const withdrawalService = {
  sentOTP,
  createWithdrawal,
};

export default withdrawalService;

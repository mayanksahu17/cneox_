import axios from "./axios";

const sendOTP = (user) => {
  return axios.post(`/wallets/withdrawal-wallet-otp`, {
    email: user?.user?.email,
  });
};
const createInterWalletTransfer = (user, data) => {
  return axios.post(`/wallets/inter-wallet-transfer`, {
    ...data,
    email: user?.user?.email,
  });
};

const updateWithdrawWallet = (user, data) => {
  return axios.put(`/wallets/withdrawal-wallet`, {
    ...data,
    email: user?.user?.email,
  });
};

const getUserDownlineInfo = (user) => {
  return axios.get(`/referral/downlines?email=${user?.user?.email}`);
};
const walletAddressService = {
  sendOTP,
  updateWithdrawWallet,
  getUserDownlineInfo,
  createInterWalletTransfer,
};

export default walletAddressService;

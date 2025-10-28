import axios from "./axios";

const getWalletByUserId = (user) => {
  return axios.get(`/wallets/${user?.user?.userId}?email=${user?.user?.email}`);
};

const walletService = {
  getWalletByUserId,
};

export default walletService;

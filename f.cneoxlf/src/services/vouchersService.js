import axios from "./axios";

const getAllVouchers = (user) => {
  return axios.get(`/voucher/user?email=${user?.user?.email}`);
};

const getAllActiveVouchers = (user) => {
  return axios.get(`/voucher/user-active?email=${user?.user?.email}`);
};

const createVoucher = (user, data) => {
  return axios.post("/voucher", data);
};

const vouchersService = {
  getAllVouchers,
  getAllActiveVouchers,
  createVoucher,
};

export default vouchersService;

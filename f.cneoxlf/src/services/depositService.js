import axios from "./axios";

const makeDeposit = async (data) => {
  return axios.post("/payment/create_transaction", data);
};
const makeNowDeposit = async (data) => {
  return axios.post("/nowpayment/create_transaction", data);
};

const depositService = {
  makeDeposit,
  makeNowDeposit,
};

export default depositService;

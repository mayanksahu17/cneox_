import axios from "./axios";

const getDailyReport = () => {
  return axios.get(`/users/daily-report`);
};

const getAllCoinpaymentTransaction = () => {
  return axios.get(`/payment/transactions`);
};
const getAllNownpaymentTransaction = () => {
  return axios.get(`/nowpayment/transactions`);
};

const getCountryReport = () => {
  return axios.get(`/users/country-report`);
};

const getAllDeposits = () => {
  return axios.get(`/deposits`);
};

const getAllInvestments = () => {
  console.log("here");
  return axios.get(`/investments`);
};
const getAllInvestmentsByAdmin = () => {
  return axios.get(`/admin/admin-activated-package`);
};
const getAllWithdrawals = () => {
  return axios.get(`/withdrawal/fetch-all`);
};

const getAllIntraWalletTransfer = () => {
  return axios.get(`/wallets/intra-transfer`);
};

const getBIReport = () => {
  return axios.get(`/binary-transactions`);
};
const getRIReport = () => {
  return axios.get(`/roi-transactions`);
};

const getAllReferralTransactions = () => {
  return axios.get(`/referral-transactions`);
};

const getAllCareerRewards = () => {
  return axios.get(`/career-rewards`);
};

const getVouchers = () => {
  return axios.get(`/voucher`);
};
const getAdminVouchers = () => {
  return axios.get(`/voucher/admin`);
};

const reportService = {
  getDailyReport,
  getAllCoinpaymentTransaction,
  getCountryReport,
  getAllDeposits,
  getAllInvestments,
  getAllWithdrawals,
  getAllIntraWalletTransfer,
  getBIReport,
  getAllReferralTransactions,
  getAllCareerRewards,
  getRIReport,
  getAllInvestmentsByAdmin,
  getVouchers,
  getAllNownpaymentTransaction,
  getAdminVouchers,
};

export default reportService;

// import axios from "./axios";

// // Function to introduce delay
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // Delay duration (30 minutes = 1800000 ms)
// const DELAY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// const getDailyReport = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/users/daily-report`);
// };

// const getAllCoinpaymentTransaction = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/payment/transactions`);
// };

// const getAllNownpaymentTransaction = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/nowpayment/transactions`);
// };

// const getCountryReport = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/users/country-report`);
// };

// const getAllDeposits = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/deposits`);
// };

// const getAllInvestments = async () => {
//   console.log("here");
//   await delay(DELAY_TIME);
//   return axios.get(`/investments`);
// };

// const getAllInvestmentsByAdmin = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/admin/admin-activated-package`);
// };

// const getAllWithdrawals = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/withdrawal/fetch-all`);
// };

// const getAllIntraWalletTransfer = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/wallets/intra-transfer`);
// };

// const getBIReport = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/binary-transactions`);
// };

// const getRIReport = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/roi-transactions`);
// };

// const getAllReferralTransactions = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/referral-transactions`);
// };

// const getAllCareerRewards = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/career-rewards`);
// };

// const getVouchers = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/voucher`);
// };

// const getAdminVouchers = async () => {
//   await delay(DELAY_TIME);
//   return axios.get(`/voucher/admin`);
// };

// const reportService = {
//   getDailyReport,
//   getAllCoinpaymentTransaction,
//   getCountryReport,
//   getAllDeposits,
//   getAllInvestments,
//   getAllWithdrawals,
//   getAllIntraWalletTransfer,
//   getBIReport,
//   getAllReferralTransactions,
//   getAllCareerRewards,
//   getRIReport,
//   getAllInvestmentsByAdmin,
//   getVouchers,
//   getAllNownpaymentTransaction,
//   getAdminVouchers,
// };

// export default reportService;

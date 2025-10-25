import axios from "./axios";

const getROIReport = (user) => {
  return axios.get(`/roi-transactions/user?email=${user?.user?.email}`);
};

const getBIReport = (user) => {
  return axios.get(`/binary-transactions/user?email=${user?.user?.email}`);
};

const getRIReport = (user) => {
  return axios.get(`/referral-transactions/user?email=${user?.user?.email}`);
};

const getDepositReport = (user) => {
  return axios.get(
    `/deposits/user/${user?.user?.userId}?email=${user?.user?.email}`
  );
};

const getExtraIncomeReport = (user) => {
  return axios.get(`/career-rewards/user?email=${user?.user?.email}`);
};

const getTokenReport = (user) => {
  return axios.get(
    `/tokens/user/${user?.user?.userId}?email=${user?.user?.email}`
  );
};

const getWithdrawalReport = (user) => {
  return axios.get(`withdrawal/user?email=${user?.user?.email}`)
    .then(response => {
      if (response.data && response.data.data) {
        // Apply charges based on wallet source
        const modifiedData = response.data.data.map(item => {
          // Set wallet source if not present (for backward compatibility)
          const walletSource = item.wallet_source || "ROI Wallet";
          
          // Apply charges based on wallet source
          let charges = 0;
          if (walletSource === "ROI Wallet") {
            charges = 7.0;
          } else if (walletSource === "R&B Wallet") {
            charges = 0.0;
          } else if (walletSource === "Extra Income Wallet") {
            charges = 0.0;
          }
          
          // Calculate final amount based on charges
          const amount = parseFloat(item.amount);
          const chargeAmount = (charges / 100) * amount;
          const finalAmount = amount - chargeAmount;
          
          return {
            ...item,
            wallet_source: walletSource,
            charges: charges,
            final_amount: finalAmount.toFixed(2)
          };
        });
        
        response.data.data = modifiedData;
      }
      return response;
    });
};

const getTradeReport = (user) => {
  return axios.get(`kyc/report?email=${user?.user?.email}`);
};

const reportService = {
  getROIReport,
  getBIReport,
  getRIReport,
  getDepositReport,
  getExtraIncomeReport,
  getTokenReport,
  getWithdrawalReport,
  getTradeReport,
};

export default reportService;

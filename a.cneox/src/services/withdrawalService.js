import axios from "./axios";

export function getAllROITransactions() {
  return axios.get(`/withdrawal/fetch-roi`);
}

export function getAllRBTransactions() {
  return axios.get(`/withdrawal/fetch-rb`);
}

export function getAllInterestWithdrwal() {
  return axios.get(`/withdrawal/fetch-interest`);
}

export function approveOrRejectWithdrawal(data) {
  return axios.post(`/withdrawal/approveOrRejectWithdrawals`, data);
}

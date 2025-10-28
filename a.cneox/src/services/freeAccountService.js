import axios from "./axios";

export function fetchAllFreeAccountsTransactions() {
  return axios.get(`/free-account`);
}

export function fetchFreeAccountsTransactionById(id) {
  return axios.get(`/free-account/${id}`);
}

export function createFreeAccountsTransaction(transactionData) {
  transactionData.admin = JSON.parse(
    localStorage.getItem("one_ozo_admin_profile")
  )?.email;
  return axios.post(`/free-account/create`, transactionData);
}

export function updateFreeAccountsTransaction(id, updateData) {
  return axios.put(`/free-account/${id}`, updateData);
}

export function deleteFreeAccountsTransaction(id) {
  return axios.delete(`/free-account/${id}`);
}

export function addFreeAccountTransactions(data) {
  return axios.post("/free-account/create", data);
}

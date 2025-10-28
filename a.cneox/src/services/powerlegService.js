import axios from "./axios";

// Fetch all transactions in the powerleg accounts
export function fetchAllPowerlegTransactions() {
  return axios.get(`/powerleg`);
}

// Fetch a specific transaction in the powerleg accounts by ID
export function fetchPowerlegTransactionById(id) {
  return axios.get(`/powerleg/powerleg/${id}`);
}

// Create a new transaction in the powerleg accounts
export function createPowerlegTransaction(transactionData) {
  transactionData.admin = JSON.parse(
    localStorage.getItem("crown_admin")
  )?.email;

  return axios.post(
    `/powerleg/powerleg/create?email=${transactionData.admin.email}`,
    transactionData
  );
}

// Update a specific transaction in the powerleg accounts by ID
export function updatePowerlegTransaction(id, updateData) {
  return axios.put(`/powerleg/powerleg/${id}`, updateData);
}

// Delete a specific transaction in the powerleg accounts by ID
export function deletePowerlegTransaction(id) {
  return axios.delete(`/powerleg/powerleg/${id}`);
}

export function addPowerLegTransactions(data) {
  return axios.post("/powerleg/create", data);
}

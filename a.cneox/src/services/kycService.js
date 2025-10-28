import axios from "./axios";

export function fetchAllKYCs() {
  return axios.get(`/kyc`);
}

export function fetchAllPendingKYCs() {
  return axios.get(`/kyc/pending`);
}

export function updateKYC(data) {
  return axios.put(`/kyc`, data);
}

export function approveOrRejecKYC(data) {
  return axios.post(`/kyc/approveOrRejecKYC`, data);
}

import axiosInstance from "./axios";

export function sendCredentials(userId) {
  return axiosInstance.post(`/users/credentials/${userId}`);
}
export function sendVerifyLink(formData) {
  return axiosInstance.post(`/email/verify-link-admin`, formData);
}
export function genarateVerifyLink(formData) {
  return axiosInstance.post(`/email/generate-link-admin`, formData);
}
export function changeStatus(formData) {
  return axiosInstance.post(`/users/update-status`, formData);
}
export function createInvestmentAdmin(formData) {
  return axiosInstance.post(`/investments/admin`, formData);
}
export function createVoucherAdmin(formData) {
  return axiosInstance.post(`/voucher/admin`, formData);
}

import axios from "./axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Delay duration (30 minutes = 1800000 ms)
const DELAY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function fetchUsers() {
  return axios.get(`/users/all-users-data`);
}

// export async function fetchUsers() {
//   await delay(DELAY_TIME);
//   return axios.get(`/users/all-users-data`);
// }

export function fetchUserById(id) {
  return axios.get(`/users/${id}`);
}
export function fetchUserKundli(id) {
  return axios.get(`/users/kundli/${id}`);
}

export function fetchAllActiveUsers() {
  return axios.get(`/users/active-list`);
}

export function fetchUsersData(id) {
  return axios.get(`/users/user-data-admin/${id}`);
}

export function changeUserData(id, data) {
  return axios.put(`/users/edit-admin/${id}`, data);
}

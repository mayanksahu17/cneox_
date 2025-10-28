import axios from "./axios";

export function getAllPackages(user) {
  return axios.get(`/packages`);
}

export function createPackage(formData) {
  return axios.post("/packages", formData);
}

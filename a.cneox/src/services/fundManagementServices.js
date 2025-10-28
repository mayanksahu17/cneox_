import axios from "./axios";

export const getFundsReport = () => {
  return axios.get("/funds");
};
export const createFunds = (data) => {
  return axios.post("/funds/create", data);
};

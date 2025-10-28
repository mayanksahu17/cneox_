import axios from "./axios";

export const getAllUnReadNotification = async () => {
  return axios.get("/notifications/unseen/admin");
};

export const getAllNotification = async () => {
  return axios.get("/notifications/all/admin");
};

export const changeNotificationStatus = async (data) => {
  return axios.post("/notifications/change-status-admin", data);
};

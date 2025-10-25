import axios from "./axios";

const getAllNotifications = (user) => {
  return axios.get(`/notifications/unseen/user?email=${user?.user?.email}`);
};
export const markNotificationAsSeen = async (data, user) => {
  return axios.post("/notifications/change-status-user", {
    ...data,
    email: user?.user?.email,
  });
};
const notificationService = {
  getAllNotifications,
  markNotificationAsSeen,
};

export default notificationService;

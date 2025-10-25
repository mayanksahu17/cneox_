import axios from "./axios";

const updateUserDetails = (user, data) => {
  return axios.put(`/users/edit/user`, data);
};

const getUserData = (user) => {
  return axios.get(`users/user-data?email=${user?.user?.email}`);
};

const updateUserPassword = (data, user) => {
  return axios.put("/auth/change-password", {
    ...data,
    email: user?.user?.email,
  });
};

const updateUserSecurityPin = (data, user) => {
  return axios.put("/auth/change-pin", {
    ...data,
    email: user?.user?.email,
  });
};

const getNotificationSettings = (user) => {
  return axios.get(
    `/users/notification-settings/${user?.user?.userId}?email=${user?.user?.email}`
  );
};

const updateNotificationSettings = (user, data) => {
  return axios.post(`/users/notification-settings/${user?.user?.userId}`, {
    ...data,
    email: user?.user?.email,
    userId: user?.user?.userId,
  });
};

const uploadKYCDocuments = (user, data) => {
  return axios.post(`/upload/${user?.user?.userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateProfileImages = (user, data) => {
  return axios.post(`/upload/${user?.user?.userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const userService = {
  updateUserDetails,
  getUserData,
  updateUserPassword,
  updateUserSecurityPin,
  getNotificationSettings,
  updateNotificationSettings,
  uploadKYCDocuments,
  updateProfileImages,
};
export default userService;

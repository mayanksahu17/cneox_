import axios from "./axios";

const getDashboardData = (user) => {
  return axios.get(`/users/user-dashboard-data?email=${user?.user?.email}`);
};

const dashboardService = {
  getDashboardData,
};

export default dashboardService;

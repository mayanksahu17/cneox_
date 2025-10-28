import axiosInstance from "./axios";

function getDashboardData() {
  return axiosInstance.get("/admin/stats");
}

export { getDashboardData };

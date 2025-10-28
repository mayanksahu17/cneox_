import axios from "./axios";

export function getUserCashBusinessData(userId, startDate, endDate) {
  return axios.get(
    `/admin/business/${userId}?startDate=${startDate}&endDate=${endDate}`
  );
}

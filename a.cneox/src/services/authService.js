import axios from "./axios";

const loginAdmin = async (data) => {
  return axios.post("/admin/signin", data);
};

const authService = {
  loginAdmin,
};

export default authService;

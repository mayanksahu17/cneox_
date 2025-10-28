import axios from "./axios";

const uploadBulkEmail = (data) => {
  return axios.post("/email/upload-csv", data);
};

export { uploadBulkEmail };

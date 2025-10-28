import axios from "./axios";
import { baseURL } from "../constants/baseURL";

const getAllTicketsByUserId = (user) => {
  return axios.get(`${baseURL}/tickets/user?email=${user?.user?.email}`);
};

const createTicket = (user, data) => {
  return axios.post(`/tickets`, {
    ...data,
    email: user?.user?.email,
  });
};

const uploadTicketDocument = (id, data) => {
  return axios.post(`/upload/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const ticketService = {
  getAllTicketsByUserId,
  uploadTicketDocument,
  createTicket,
};

export default ticketService;

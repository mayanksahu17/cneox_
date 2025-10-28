import axios from "./axios";

export function fetchTickets(user) {
  return axios.get(`/tickets`, { params: { status: "open" } });
}

export function updateTicketsbyId(id, message) {
  return axios.post(`/tickets/reply/${id}`, message);
}

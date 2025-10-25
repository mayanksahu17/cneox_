const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/tickets_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");
router.get(
  "/user",
  authenticateToken,
  ticketController.getAllTicketsByRaisedBy
);
// Route for getting all tickets raised by a specific user
router.get("/", authenticateTokenAdmin, ticketController.getAllTickets);

// Route for creating a new ticket
router.post("/", authenticateToken, ticketController.createTicket);
// Route for updating a ticket
router.put("/:ticketId", authenticateTokenAdmin, ticketController.updateTicket);
router.post("/reply/:id", authenticateTokenAdmin, ticketController.replyTicket);

module.exports = router;

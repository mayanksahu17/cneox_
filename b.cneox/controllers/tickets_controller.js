const ticketService = require("../services/tickets_service");
const { formatDateToYMD } = require("../utils/date");
const emailService = require("../services/mail_service");
const user_service = require("../services/user_service");
const notificationService = require("../services/notifications_service");
const {
  sendNotificationToAdmin,
  sendNotificationToUser,
} = require("../utils/notifications");
module.exports = {
  getAllTickets: async (req, res, next) => {
    try {
      const status = req.query.status;
      let tickets;

      if (status === "all") {
        const ticketsData = await ticketService.getAllTickets();
        tickets = ticketsData;
      } else {
        const ticketsData = await ticketService.getAllTicketsByStatus(status);
        tickets = ticketsData;
      }

      res.status(200).json({ data: tickets, success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAllTicketsByRaisedBy: async (req, res, next) => {
    try {
      const raisedBy = req.user?.id;

      const tickets = await ticketService.getAllTicketsByRaisedBy(raisedBy);

      res.status(200).json({ data: tickets, success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  createTicket: async (req, res, next) => {
    try {
      const {
        department,
        service,
        subject,
        description,
        status,
        document,
        email,
      } = req.body;
      const raisedby = req.user?.id;
      const ticketData = {
        raisedby,
        department,
        service,
        subject,
        description,
        status,
        document,
      };

      const newTicketId = await ticketService.createTicket(ticketData);
      await notificationService.createNotification(
        null,
        "admin",
        `New ticket created by ${raisedby}`,
        "ticket"
      );
      await sendNotificationToAdmin(req);
      const to = email;
      const template = "ticketcreation";

      const variables = {
        date: formatDateToYMD(new Date()),
        issue: subject,
        ticketId: newTicketId,
      };

      await emailService.sendCommonElasticMail({ to, template, variables });

      await notificationService.createNotification(
        null,
        "admin",
        `New ticket created by ${req.user?.id}.`,
        "ticket"
      );
      await sendNotificationToAdmin(req);
      return res
        .status(201)
        .json({ data: { ticketId: newTicketId }, success: true });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  updateTicket: async (req, res, next) => {
    try {
      const ticketId = req.params.ticketId;
      const {
        raisedby,
        department,
        service,
        subject,
        description,
        status,
        document,
        email,
      } = req.body;

      const ticketData = {
        raisedby,
        department,
        service,
        subject,
        description,
        status,
        document,
      };

      const rowsAffected = await ticketService.updateTicket(
        ticketId,
        ticketData
      );
      if (status === "Closed") {
        const variables = {
          date: new Date(),
          issue: subject,
          ticketId: ticketId,
        };

        await emailService.sendCommonElasticMail({
          to: email,
          template: "ticketresolved",
          variables,
        });
      }
      if (rowsAffected === 0) {
        return res
          .status(404)
          .json({ message: "Ticket not found", success: false });
      }

      res
        .status(200)
        .json({ message: "Ticket updated successfully", success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  replyTicket: async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = req.body;

      console.log(id, message);

      await ticketService.replyTicket(id, message);
      const ticket = await ticketService.getTicketById(id);
      await notificationService.createNotification(
        ticket.raisedby,
        "user",
        `Ticket status changed.`,
        "ticket"
      );
      await sendNotificationToUser(req, ticket.raisedby);

      res
        .status(200)
        .json({ message: "Ticket Reply Sent successfully", success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

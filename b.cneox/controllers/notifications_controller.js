// controllers/notificationController.js

const notificationService = require("../services/notifications_service");

const notificationController = {
  getUnseenNotificationsForAdmin: async (req, res, next) => {
    try {
      const notifications =
        await notificationService.getUnseenNotificationsForAdmin();
      return res.status(200).json({ success: true, notifications });
    } catch (error) {
      console.log("Error in getUnseenNotificationsForAdmin:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  getUnseenNotificationsForUser: async (req, res, next) => {
    try {
      const notifications =
        await notificationService.getUnseenNotificationsByUserId(req?.user?.id);
      return res.status(200).json({ success: true, notifications });
    } catch (error) {
      console.log("Error in getUnseenNotificationsForAdmin:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  getAllNotificationsForUserId: async (req, res, next) => {
    try {
      const notifications =
        await notificationService.getAllNotificationsForUserId(req?.user?.id);
      return res.status(200).json({ success: true, notifications });
    } catch (error) {
      console.log("Error in getAllNotificationsForUserId:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  getUnseenNotificationsForAdmin: async (req, res, next) => {
    try {
      const notifications =
        await notificationService.getUnseenNotificationsForAdmin();
      return res.status(200).json({ success: true, notifications });
    } catch (error) {
      console.log("Error in getUnseenNotificationsForAdmin:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  getAllNotificationsForAdmin: async (req, res, next) => {
    try {
      const notifications = await notificationService.getAllNotifications(
        "admin"
      );
      return res.status(200).json({ success: true, notifications });
    } catch (error) {
      console.log("Error in getAllNotificationsForAdmin:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  getAllNotificationsForUser: async (req, res, next) => {
    try {
      const notifications = await notificationService.getAllNotifications(
        "user"
      );
      return res.status(200).json({ success: true, notifications });
    } catch (error) {
      console.log("Error in getAllNotificationsForUser:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  createNotification: async (req, res, next) => {
    try {
      const { userId, userType, message, type } = req.body;
      //'misc','ticket','fund_management','powerleg','free','coinpayment','investment','rb_withdrawal','roi_withdrawal','interest_withdrawal','token','kyc','binary','referral','roi'
      const notifications = await notificationService.createNotification(
        userId,
        userType,
        message,
        type
      );
      return res.status(200).json({ success: true, notifications });
    } catch (error) {
      console.log("Error in createNotification:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  changeNotificationStatus: async (req, res, next) => {
    const { ids, status } = req.body;
    const results = [];
    for (const id of ids) {
      try {
        const notifications =
          await notificationService.changeNotificationStatus(status, id);
        results.push({ id, success: true });
      } catch (error) {
        console.log("Error in changeNotificationStatus:", error);
        results.push({ id, success: false }); // Assuming transferData isn't relevant here
      }
    }

    return res.status(200).json({ data: results });
  },
  changeNotificationStatusUser: async (req, res, next) => {
    const { ids, status } = req.body;
    const results = [];
    console.log(ids, status);
    for (const id of ids) {
      try {
        const notification = await notificationService.getNotificationById(id);
        if (
          notification?.user_id !== req.user?.id ||
          notification?.user_type !== "user"
        ) {
          results.push({ id, success: false }); // Assuming transferData isn't relevant here
          continue;
        }
        await notificationService.changeNotificationStatus(status, id);
        results.push({ id, success: true });
      } catch (error) {
        console.log("Error in changeNotificationStatus:", error);
        results.push({ id, success: false }); // Assuming transferData isn't relevant here
      }
    }

    return res.status(200).json({ data: results });
  },
};

module.exports = notificationController;

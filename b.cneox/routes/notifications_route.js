// routes/notificationRoutes.js

const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notifications_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

router.get(
  "/unseen/admin",
  authenticateTokenAdmin,
  notificationController.getUnseenNotificationsForAdmin
);
router.get(
  "/unseen/user",
  authenticateToken,
  notificationController.getUnseenNotificationsForUser
);
router.get(
  "/all/userId",
  authenticateTokenAdmin,
  notificationController.getAllNotificationsForUserId
);
router.get(
  "/all/admin",
  authenticateTokenAdmin,
  notificationController.getAllNotificationsForAdmin
);
router.get(
  "/all/user",
  authenticateTokenAdmin,
  notificationController.getAllNotificationsForUser
);
router.post(
  "/change-status-admin",
  authenticateTokenAdmin,
  notificationController.changeNotificationStatus
);
router.post(
  "/change-status-user",
  authenticateToken,
  notificationController.changeNotificationStatusUser
);
router.post(
  "/create",
  authenticateTokenAdmin,
  notificationController.createNotification
);

module.exports = router;

const notificationService = require("../services/notifications_service");

const sendNotificationToAdmin = async (req) => {
  const io = req.app.get("io");

  const notifications =
    await notificationService.getUnseenNotificationsForAdmin();

  io.sockets.sockets.forEach((socket) => {
    if (socket.userType === "admin") {
      console.log("inside");
      socket.emit("newAdminNotification", {
        data: notifications,
        count: notifications.length,
      });
    }
  });
};

const sendNotificationToUser = async (req, userid) => {
  const io = req.app.get("io");
  let userSocket;
  io.sockets.sockets.forEach((socket, socketId) => {
    console.log("here");
    console.log(socket.userId);
    if (socket.userId === userid) {
      userSocket = socket;
      console.log(`User ID: ${socket.userId}, Socket ID: ${socketId}`);
    }
  });

  if (userSocket) {
    const userNotifications =
      await notificationService.getUnseenNotificationsByUserId(userid);
    userSocket.emit("newUserNotification", {
      data: userNotifications,
      count: userNotifications.length,
    });
  }
};

module.exports = { sendNotificationToAdmin, sendNotificationToUser };

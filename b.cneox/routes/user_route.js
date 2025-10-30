const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const admin_controller = require("../controllers/admin_controller");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

// Route for creating a new user
router.get(
  "/user-dashboard-data",
  authenticateToken,
  userController.getUserDashboardData
);
router.post("/verifyPin", authenticateToken, userController.verifyUserByPin);
// router.get("/fetch-all", authenticateToken, userController.fetchAllUsersData);
router.get(
  "/all-users-data",
  authenticateTokenAdmin,
  userController.getAllUsersData
);
router.get(
  "/active-list",
  authenticateTokenAdmin,
  admin_controller.getActiveUsers
);
router.get("/daily-report", authenticateTokenAdmin, userController.getReports);

router.get(
  "/country-report",
  authenticateTokenAdmin,
  userController.getReportByCountry
);
router.get("/", authenticateToken, userController.getAllUsers);

router.get("/user-data", authenticateToken, userController.getUserDataByUserId);

// Route for getting user by ID
router.get("/name/:id", userController.getUserNameById);

router.get("/kundli/:id", authenticateTokenAdmin, userController.getUserKundli);

//this will give evrything apart from binary needed in user dashabord
router.get(
  "/user-data-admin/:id",
  authenticateTokenAdmin,
  userController.getUserDataByUserIdForAdmin
);

router.put("/edit/user", authenticateToken, userController.updateProfile);
router.put(
  "/edit-admin/:id",
  authenticateTokenAdmin,
  userController.updateProfileAdmin
);
router.post(
  "/credentials/:userId",
  authenticateTokenAdmin,
  userController.credentials
);

router.post(
  "/update-status",
  authenticateTokenAdmin,
  userController.updateStatus
);

router
  .route("/notification-settings/:id")
  .get(authenticateToken, userController.getNotificationSettingsById)
  .post(authenticateToken, userController.updateNotificationSettings);

module.exports = router;

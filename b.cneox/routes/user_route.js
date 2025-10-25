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
router.get("/fetch-all", authenticateToken, userController.fetchAllUsersData);4


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

// router.get("/getuser", userController.getUsers);

// getUsers : async (req, res) => {
//   try {
//     connectionPool.getConnection((err, connection) => {
//       if (err) {
//         res.status(500).json({ error: 'Database connection error' });
//         return;
//       }

//       const query = 'SELECT name, email FROM users_table'; // Query to fetch name and email

//       connection.query(query, (err, results) => {
//         connection.release(); // Always release connection back to the pool

//         if (err) {
//           res.status(500).json({ error: 'Error fetching data' });
//           return;
//         }

//         // Create a new workbook
//         const wb = xlsx.utils.book_new();
        
//         // Convert results to a worksheet
//         const ws = xlsx.utils.json_to_sheet(results);

//         // Append the worksheet to the workbook
//         xlsx.utils.book_append_sheet(wb, ws, 'Users');

//         // Generate a binary string of the Excel file
//         const fileBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

//         // Option 1: Save the file on the server (optional)
//         // fs.writeFileSync('/tmp/users_data.xlsx', fileBuffer);

//         // Option 2: Directly send the file as a response for download
//         res.setHeader('Content-Disposition', 'attachment; filename=users_data.xlsx');
//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//         res.send(fileBuffer);
//       });
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// },

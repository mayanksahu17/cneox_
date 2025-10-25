const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/login-otp", authController.sendLoginOTP);
router.post("/forgot-password", authController.sendPasswordResetController);
router.post("/forgot-password-reset", authController.changePassword);
router.put("/change-pin", authenticateToken, authController.changePinByUserId);
router.put(
  "/change-password",
  authenticateToken,
  authController.updatePasswordByUserId
);
router.post("/verify", authController.verifyUserId);

module.exports = router;

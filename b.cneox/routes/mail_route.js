const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const emailController = require("../controllers/mail_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: "Too many requests. Please try again later.",
});

// Send email
router.post("/", authenticateToken, emailController.sendEmail);
router.post("/upload-csv", authenticateTokenAdmin, emailController.uploadCSV);

//to send verify link
router.post("/verify", emailController.sendVerifyLink);
router.post(
  "/verify-link-admin",
  authenticateTokenAdmin,
  emailController.sendVerifyLink
);
router.post(
  "/generate-link-admin",
  authenticateTokenAdmin,
  emailController.generateVerificationLink
);
router.post("/otp", authenticateToken, otpLimiter, emailController.sendOtp);
router.post("/invite-friend", authenticateToken, emailController.sendInvite);
router.post(
  "/partial-payment",
  authenticateToken,
  emailController.sendPartialPaymentNotification
);
router.post(
  "/submissions",
  authenticateToken,
  emailController.createEmailSubmission
);

router.get(
  "/submissions/",
  authenticateToken,
  emailController.getEmailSubmissionsByUserId
);
router.get(
  "/submissions/user/:userId",
  authenticateToken,
  emailController.getEmailSubmissionsByUserId
);
module.exports = router;

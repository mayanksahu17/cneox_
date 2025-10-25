const express = require("express");
const router = express.Router();
const walletsController = require("../controllers/wallets_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const rateLimit = require("express-rate-limit");
const mail_controller = require("../controllers/mail_controller");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: "Too many requests. Please try again later.",
});
router.get(
  "/inter-wallet",
  authenticateTokenAdmin,
  walletsController.getAllInterWalletTransfer
);
router.get(
  "/:userId",
  authenticateToken,
  walletsController.getAllWalletsByUserId
);
router.post(
  "/withdrawal-wallet-otp",
  otpLimiter,
  authenticateToken,
  mail_controller.sendOtp
);
router.post(
  "/inter-wallet-transfer",
  authenticateToken,
  walletsController.interWalletTransfer
);
router.put(
  "/withdrawal-wallet",
  authenticateToken,
  walletsController.updateWithdrawalWallet
);

module.exports = router;

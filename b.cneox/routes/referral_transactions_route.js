const express = require("express");
const router = express.Router();
const referralTransactionController = require("../controllers/referral_transactions_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");
router.get(
  "/user",
  authenticateToken,
  referralTransactionController.getReferralTransactionsByUserId
);
router.get(
  "/",
  authenticateTokenAdmin,
  referralTransactionController.getAllReferralTransactions
);

router.post(
  "/",
  authenticateToken,
  referralTransactionController.createReferralTransaction
);
module.exports = router;

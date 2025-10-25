const express = require("express");
const router = express.Router();
const coinpaymentController = require("../controllers/coinpayments_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

// router.get(
//   "/getOpAccountInfo",
//   authenticateToken,
//   coinpaymentController.getBasicAccountInfo
// );

router.post(
  "/create_transaction",
  // authenticateToken,
  coinpaymentController.createTransaction
);
// router.post("/ipn", authenticateToken, coinpaymentController.getWebhookData);
router.post(
  "/deposit/ipn",

  coinpaymentController.getDepositData
);
router.get(
  "/getTransactionInfo",
  // authenticateToken,
  coinpaymentController.getTransactionInfo
);
// router.get(
//   "/getDepositAddress/:currency",
//   authenticateToken,
//   coinpaymentController.getDepositAddress
// );
router.get(
  "/transactions",
  authenticateTokenAdmin,
  coinpaymentController.getAllTransactions
);
module.exports = router;

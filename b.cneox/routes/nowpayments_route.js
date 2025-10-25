const express = require("express");
const router = express.Router();
const nowpaymentController = require("../controllers/nowpayments_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

router.post(
  "/create_transaction",
  // authenticateToken,
  nowpaymentController.createTransaction
);
router.post(
  "/deposit/ipn",

  nowpaymentController.getDepositData
);
router.get("/getTransactionInfo", nowpaymentController.getTransactionInfo);

router.get(
  "/transactions",
  authenticateTokenAdmin,
  nowpaymentController.getAllTransactions
);
module.exports = router;

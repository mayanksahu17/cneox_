const express = require("express");
const router = express.Router();
const binaryTransactionController = require("../controllers/binary_transactions_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");
router.get(
  "/user",
  authenticateToken,
  binaryTransactionController.getBinaryTransactionsByUserId
);
router.get(
  "/",
  authenticateTokenAdmin,
  binaryTransactionController.getAllBinaryTransactions
);

// router.post(
//   "/",
//   authenticateToken,
//   binaryTransactionController.createBinaryTransaction
// );
module.exports = router;

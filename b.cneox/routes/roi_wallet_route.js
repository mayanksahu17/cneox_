const express = require("express");
const router = express.Router();
const roiTransactionController = require("../controllers/roi_transactions_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");
router.get(
  "/user",
  authenticateToken,
  roiTransactionController.getROITransactionsByUserId
);
router.get(
  "/",
  authenticateTokenAdmin,
  roiTransactionController.getAllROITransactions
);
router.get(
  "/groupBy/:group",
  authenticateToken,
  roiTransactionController.getAllROITransactionsGrouped
);
router.get(
  "/filterBy/status/:status",
  authenticateToken,
  roiTransactionController.filteredByStatus
);
router.get(
  "/filterBy/dateRange/:startDate/:endDate",
  authenticateToken,
  roiTransactionController.filteredByDateRange
);

module.exports = router;

const roiTransactionService = require("../services/roi_transactions_service");
const packageService = require("../services/packages_master_service");
const investmentService = require("../services/invetsments_service");
module.exports = {
  getAllROITransactions: async (req, res) => {
    try {
      const roiTransactions =
        await roiTransactionService.getAllROITransactions();

      res.status(200).json({ data: roiTransactions, success: true });
    } catch (error) {
      console.error("Error retrieving ROI transactions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAllROITransactionsGrouped: async (req, res) => {
    try {
      const group = req.params.group;
      var roiTransactions;
      switch (group.toUpperCase()) {
        case "STATUS":
          roiTransactions = await roiTransactionService.groupedByStatus();
          break;
        default:
          roiTransactions = await roiTransactionService.sortByStatus();
          break;
      }
      res.status(200).json({ data: roiTransactions, success: true });
    } catch (error) {
      console.error("Error retrieving ROI transactions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  filteredByStatus: async (req, res) => {
    try {
      const status = req.params.status.toLowerCase();
      var roiTransactions;
      switch (status) {
        case "new":
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
        case "pending":
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
        case "completed":
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
        case "expired":
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
        case "unresolved":
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
        case "resolved":
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
        case "cancelled":
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
        case "pending_refund":
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
        case "refunded":
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
        default:
          roiTransactions = await roiTransactionService.filterByStatus(status);
          break;
      }
      res.status(200).json({ data: roiTransactions, success: true });
    } catch (error) {
      console.error("Error retrieving ROI transactions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  filteredByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.params;
      // endDate.setDate(endDate.getDate() + 1);
      // console.log(startDate, "${endDate} 23:59:59");
      const roiTransactions = await roiTransactionService.filteredByDateRange(
        startDate,
        endDate
      );

      res.status(200).json({ data: roiTransactions, success: true });
    } catch (error) {
      console.error("Error retrieving ROI transactions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getROITransactionsByUserId: async (req, res) => {
    try {
      const userId = req.user?.id;
      console.log(userId);
      const roiTransactions =
        await roiTransactionService.getROITransactionsByUserId(userId);

      res.status(200).json({ data: roiTransactions, success: true });
    } catch (error) {
      console.error("Error retrieving ROI transactions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

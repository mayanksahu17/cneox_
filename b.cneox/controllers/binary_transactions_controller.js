const binaryTransactionService = require("../services/binary_transaction_service");
const investmentService = require("../services/invetsments_service");
const packageService = require("../services/packages_master_service");
module.exports = {
  createBinaryTransaction: async (req, res) => {
    try {
      const {
        user_id,
        package_id,
        amount,
        date,
        referral_user_id,
        investment_id,
        position,
      } = req.body;

      // Create the binary transaction
      const binaryTransaction =
        await binaryTransactionService.createBinaryTransaction(
          user_id,
          package_id,
          amount,
          date,
          referral_user_id,
          investment_id,
          position
        );

      res.status(201).json({ data: binaryTransaction, success: true });
    } catch (error) {
      console.error("Error creating binary transaction:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAllBinaryTransactions: async (req, res) => {
    try {
      const binaryTransactions =
        await binaryTransactionService.getAllBinaryTransactions();
      for (let i = 0; i < binaryTransactions.length; i++) {
        const binaryTransaction = binaryTransactions[i];
        binaryTransaction.percentage = "10%";
      }

      res.status(200).json({ data: binaryTransactions, success: true });
    } catch (error) {
      console.error("Error retrieving binary transactions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getBinaryTransactionsByUserId: async (req, res) => {
    try {
      const userId = req.user?.id;
      const binaryTransactions =
        await binaryTransactionService.getBinaryTransactionsByUserId(userId);
      for (let i = 0; i < binaryTransactions.length; i++) {
        const binaryTransaction = binaryTransactions[i];

        // if (binaryTransaction?.package_id) {
        //   const packageDetails = await packageService.getPackageById(
        //     binaryTransaction?.package_id
        //   );

        // binaryTransaction.package_name = packageDetails.package_name;
        binaryTransaction.percentage = 10;
        // }
      }
      res.status(200).json({ data: binaryTransactions, success: true });
    } catch (error) {
      console.error("Error retrieving binary transactions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

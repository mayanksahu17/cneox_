const referralTransactionService = require("../services/referral_transactions_service");
const referralService = require("../services/referral_service");
const investmentService = require("../services/invetsments_service");
const packageService = require("../services/packages_master_service");

module.exports = {
  createReferralTransaction: async (req, res) => {
    try {
      const {
        user_id,
        package_id,
        amount,
        date,
        referral_user_id,
        investment_id,
      } = req.body;

      // Create the referral transaction
      const referralTransaction =
        await referralTransactionService.createReferralTransaction(
          user_id,
          package_id,
          amount,
          date,
          referral_user_id,
          investment_id
        );

      res.status(201).json({ data: referralTransaction, success: true });
    } catch (error) {
      console.error("Error creating referral transaction:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getReferralTransactionsByUserId: async (req, res) => {
    try {
      const userId = req.user?.id;

      const referralTransactions =
        await referralTransactionService.getReferralTransactionsByUserId(
          userId
        );

      // Iterate over each referral transaction
      for (let i = 0; i < referralTransactions.length; i++) {
        const referralTransaction = referralTransactions[i];
        const { user_id, referral_user_id } = referralTransaction;

        // Get referrals by user_id and referral_user_id
        const referrals =
          await referralService.getReferralsByReferredIdAndReferralId(
            referral_user_id,
            user_id
          );

        // referralTransaction.referrals = referrals;
        referralTransaction.position = referrals[0].position.toUpperCase();

        const investment = await investmentService.getInvestmentById(
          referralTransaction.investment_id
        );
        if (investment?.package_id) {
          const packageId = investment?.package_id;
          const packageDetails = await packageService.getPackageById(packageId);
          referralTransaction.package = packageDetails.package_name;
          // Calculate referral percentage
          if (referrals[0].parent_id === 1) {
            referralTransaction.percentage = packageDetails.level_one_referral;
          } else if (referrals[0].parent_id === 2) {
            referralTransaction.percentage = packageDetails.level_two_referral;
          } else if (referrals[0].parent_id === 3) {
            referralTransaction.percentage =
              packageDetails.level_three_referral;
          }
        }
      }

      res.status(200).json({ data: referralTransactions, success: true });
    } catch (error) {
      console.error("Error retrieving referral transactions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllReferralTransactions: async (req, res) => {
    try {
      const referralTransactions =
        await referralTransactionService.getAllReferralTransactions();

      res.status(200).json({ data: referralTransactions, success: true });
    } catch (error) {
      console.error("Error retrieving referral transactions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

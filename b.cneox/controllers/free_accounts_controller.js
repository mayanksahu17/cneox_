const userService = require("../services/user_service");
const investmentService = require("../services/invetsments_service");
const walletService = require("../services/wallets_service");
const freeAccountsService = require("../services/free_account_service");
const packageService = require("../services/packages_master_service");
const { generateString } = require("../utils/string-generator");
const binary_tree_service = require("../services/binary_tree_service");

const { formatToUKTime, getUKTime, formatDateToYMD } = require("../utils/date");
const user_service = require("../services/user_service");
const { sendCommonElasticMail } = require("../services/mail_service");
const notificationService = require("../services/notifications_service");
const {
  sendNotificationToUser,
  sendNotificationToAdmin,
} = require("../utils/notifications");
// Controller
const addBusinessDays = (date, daysToAdd) => {
  let count = 0;
  while (count < daysToAdd) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 6 && date.getDay() !== 0) {
      count++;
    }
  }
  return date;
};
module.exports = {
  create: async (req, res, next) => {
    try {
      const {
        user_id,

        package_id,
        amount,
        gateway,
        target_amount,
        target_type,
      } = req.body;
      const packageData = await packageService.getPackageById(package_id);
      const duration = packageData?.duration;
      const investment_date = getUKTime();
      const userExists = await user_service.getUserById(user_id);
      if (!userExists) {
        return res.status(400).json({
          message: "Bad equest",
          status: false,
        });
      }
      const expires_on = addBusinessDays(new Date(), duration);
      const txn_id = "IN-".concat(generateString(12)) + new Date().getTime();
      const type = "free";

      const sponsor = 0;
      const invested_amount = amount;
      const deposit_amount = amount;
      const token_amount = 0;
      const voucher_id = "NA";
      const crypto_type = gateway;
      //first carete actutal invetment
      console.log("creating entry in invetsmenest for free account");
      const investment = await investmentService.createInvestment(
        txn_id,
        user_id,
        sponsor,
        package_id,
        invested_amount,
        investment_date,
        expires_on,
        deposit_amount,
        token_amount,
        type,
        crypto_type,
        voucher_id
      );
      //update user wallet
      await walletService.updateTotalInvestment(user_id, invested_amount);
      await userService.markUserIdActive({ userId: user_id });

      req.body.status = "pending";
      req.body.investment_id = investment.investment_id;

      // Check target_type and take necessary action
      // if (target_type === "direct") {
      //   const walletDetails = await walletService.getAllWalletsByUserId(
      //     user_id
      //   );
      //   console.log(
      //     walletDetails,
      //     walletDetails[0].direct_business,
      //     target_amount,
      //     parseFloat(walletDetails[0].direct_business) <
      //       parseFloat(target_amount)
      //   );

      //   if (
      //     parseFloat(walletDetails[0].direct_business) <
      //     parseFloat(target_amount)
      //   ) {
      //     console.log("suspending user");
      //     await userService.updateUserStatus({
      //       userId: user_id,
      //       newStatus: "suspended",
      //     });
      //   } else {
      //     req.body.status = "completed";
      //   }
      // } else if (target_type === "tree") {
      //   console.log(user_id);
      //   const binaryTreeDetails =
      //     await binary_tree_service.getBinaryTreeEntryByUserId(user_id);
      //   console.log(
      //     parseFloat(binaryTreeDetails.left_business),
      //     parseFloat(binaryTreeDetails.right_business),
      //     parseFloat(target_amount)
      //   );
      //   if (
      //     parseFloat(binaryTreeDetails.left_business) <
      //       parseFloat(target_amount) &&
      //     parseFloat(binaryTreeDetails.right_business) <
      //       parseFloat(target_amount)
      //   ) {
      //     console.log("here");
      //     await userService.updateUserStatus({
      //       userId: user_id,
      //       newStatus: "suspended",
      //     });
      //   } else {
      //     req.body.status = "completed";
      //   }
      // }
      await userService.updateUserStatus({
        userId: user_id,
        newStatus: "suspended",
      });
      req.body.status = "completed";

      const transaction = await freeAccountsService.createTransaction(req.body);
      await investmentService.updateSuspendedUsers();
      //now send mail
      const variables = {
        date: formatDateToYMD(investment_date),
        package: packageData?.package_name,
        amount: invested_amount,
        userId: user_id,
      };

      await sendCommonElasticMail({
        to: userExists?.email,
        template: "newpackage",
        variables,
      });
      await notificationService.createNotification(
        user_id,
        "user",
        `Congrats! You have received Active investment of $${invested_amount}!.`,
        "free"
      );
      await sendNotificationToUser(req, user_id);

      await notificationService.createNotification(
        null,
        "admin",
        `Free account created for ${user_id} of $${invested_amount}.`,
        "free"
      );
      await sendNotificationToAdmin(req);

      res.status(200).json({ data: transaction, success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAll: async (req, res, next) => {
    try {
      const transactions = await freeAccountsService.getAllTransactions();
      res.status(200).json({ data: transactions, success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getById: async (req, res, next) => {
    try {
      const transaction = await freeAccountsService.getTransactionById(
        req.params.id
      );
      if (!transaction) {
        return res
          .status(404)
          .json({ success: false, message: "Transaction not found" });
      }
      res.status(200).json({ data: transaction, success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  update: async (req, res, next) => {
    try {
      await freeAccountsService.updateTransaction(req.params.id, req.body);
      res
        .status(200)
        .json({ success: true, message: "Transaction updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  delete: async (req, res, next) => {
    try {
      await freeAccountsService.deleteTransaction(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Transaction deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

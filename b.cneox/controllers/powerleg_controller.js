const userService = require("../services/user_service");
const investmentService = require("../services/invetsments_service");
const walletService = require("../services/wallets_service");
const powerlegService = require("../services/powerleg_service");
const packageService = require("../services/packages_master_service");
const { generateString } = require("../utils/string-generator");
const {
  updateBinaryBusinessVolumeAndCalculateBonus,
} = require("./investments_controller");
const { formatToUKTime, formatDateToYMD, getUKTime } = require("../utils/date");
const { sendCommonElasticMail } = require("../services/mail_service");
const notificationService = require("../services/notifications_service");
const {
  sendNotificationToUser,
  sendNotificationToAdmin,
} = require("../utils/notifications");
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
// Controller
module.exports = {
  create: async (req, res, next) => {
    try {
      const {
        user_id,

        package_id,
        amount,
        gateway,
      } = req.body;
      const packageData = await packageService.getPackageById(package_id);
      const duration = packageData?.duration;
      const investment_date = getUKTime();
      const expires_on = addBusinessDays(new Date(), duration);
      const txn_id = "IN-".concat(generateString(12)) + new Date().getTime();
      const type = "powerleg";
      // Get today's date
      const userExists = await userService.getUserById(user_id);

      if (!userExists) {
        return res.status(400).json({
          message: "Bad equest",
          status: false,
        });
      }
      const sponsor = null;
      const invested_amount = parseFloat(amount);
      const deposit_amount = parseFloat(amount);
      const token_amount = 0;
      const voucher_id = "NA";
      const crypto_type = gateway;
      //first carete actutal invetment
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
      await userService.markUserIdActive({ userId: user_id });

      //update user wallet
      await walletService.updateTotalInvestment(user_id, invested_amount);

      await updateBinaryBusinessVolumeAndCalculateBonus(
        user_id,
        invested_amount,
        req
      );
      const variables = {
        date: formatDateToYMD(investment_date),
        package: packageData.package_name,
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
        `Congrats! You have received Powerleg investment of $${invested_amount}!.`,
        "powerleg"
      );
      await sendNotificationToUser(req, user_id);

      await notificationService.createNotification(
        null,
        "admin",
        `Powerleg Investment created for ${user_id} of $${invested_amount}.`,
        "powerleg"
      );
      await sendNotificationToAdmin(req);
      req.body.status = "complete";
      const transaction = await powerlegService.createTransaction(req.body);
      await investmentService.updateSuspendedUsers();

      const io = req.app.get("io");
      io.emit("newInvestment", investment);

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
      const transactions = await powerlegService.getAllTransactions();
      res.status(200).json({ data: transactions, success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getById: async (req, res, next) => {
    try {
      const transaction = await powerlegService.getTransactionById(
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
      await powerlegService.updateTransaction(req.params.id, req.body);
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
      await powerlegService.deleteTransaction(req.params.id);
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

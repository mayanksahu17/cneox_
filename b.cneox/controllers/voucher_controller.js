const { getUserAndWalletData } = require("../services/user_service");
const voucherService = require("../services/voucher_service");
const { generateStringAllCaps } = require("../utils/string-generator");
const walletService = require("../services/wallets_service");
const notificationService = require("../services/notifications_service");
const { sendNotificationToUser } = require("../utils/notifications");
const { checkFreeAccount } = require("../services/free_account_service");

module.exports = {
  getAllVouchers: async (req, res, next) => {
    try {
      const vouchers = await voucherService.getAllVouchers();
      if (vouchers) {
        res.status(200).json({ data: vouchers, success: true });
      } else {
        res.status(404).json({ message: "Not found", success: false });
      }
    } catch (error) {
      if (error == "") console.log("Error: ", error.sqlMessage);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllAdminVouchers: async (req, res, next) => {
    try {
      const vouchers = await voucherService.getAllAdminVouchers();
      if (vouchers) {
        res.status(200).json({ data: vouchers, success: true });
      } else {
        res.status(404).json({ message: "Not found", success: false });
      }
    } catch (error) {
      if (error == "") console.log("Error: ", error.sqlMessage);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAllVouchersById: async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const vouchers = await voucherService.getAllVouchersById(userId);
      if (vouchers) {
        res.status(200).json({ data: vouchers, success: true });
      } else {
        res.status(404).json({ message: "Not found", success: false });
      }
    } catch (error) {
      if (error == "") console.log("Error: ", error.sqlMessage);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getVoucherByVoucherId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const vouchers = await voucherService.getVoucherByVoucherId(id);
      if (vouchers) {
        res.status(200).json({ data: vouchers, success: true });
      } else {
        res.status(404).json({ message: "Not found", success: false });
      }
    } catch (error) {
      if (error == "") console.log("Error: ", error.sqlMessage);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  createVoucher: async (req, res, next) => {
    try {
      const { wallet, amount } = req.body;
      const userId = req.user?.id;
      if (
        !parseFloat(amount) ||
        parseFloat(amount) < 0 ||
        !["roi", "interest", "rnb"].includes(wallet)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid data",
        });
      }
      console.log(userId);
      // Check if user has a free account
      const hasFreeAccount = await checkFreeAccount(userId);

      if (hasFreeAccount) {
        return res.status(404).json({
          success: true,
          message: "Voucher cannot be generated for free account",
        });
      }
      const userWallet = await getUserAndWalletData({ userId });
      if (!userWallet) {
        return res.status(404).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      const walletMapping = {
        roi: "roi_wallet",
        interest: "interest_wallet",
        rnb: "referral_binary_wallet",
      };
      if (
        walletMapping[wallet] &&
        parseFloat(amount) > parseFloat(userWallet[walletMapping[wallet]])
      ) {
        return res.status(400).json({
          success: false,
          message: "Insufficient Funds",
        });
      }
      const voucherId = generateStringAllCaps(10);

      const voucher = await voucherService.createVoucher({
        userId,
        voucherId,
        wallet,
        amount,
        created_by: "self",
      });
      switch (wallet) {
        case "roi":
          await walletService.updateRoiWallet(userId, amount * -1);
          break;
        case "interest":
          await walletService.updateInterestWallet(userId, amount * -1);
          break;
        case "rnb":
          await walletService.updateReferralBinaryWallet(userId, amount * -1);
          break;
      }
      await walletService.updateTotalTokenGenerated(userId, amount);
      await notificationService.createNotification(
        userId,
        "user",
        `Voucher worth $${amount} generated from ${walletMapping[
          wallet
        ].toUpperCase()} wallet`,
        "voucher"
      );
      await sendNotificationToUser(req, userId);
      return res.status(201).json({
        data: {
          voucher_id: voucherId,
          wallet: wallet,
          amount: amount,
          created_on: Date(),
        },
        success: true,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  createVoucherAdmin: async (req, res, next) => {
    try {
      const { wallet, amount, userId } = req.body;

      if (
        !parseFloat(amount) ||
        parseFloat(amount) < 0 ||
        !["roi", "interest", "rnb"].includes(wallet)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid data",
        });
      }
      const walletMapping = {
        roi: "roi_wallet",
        interest: "interest_wallet",
        rnb: "referral_binary_wallet",
      };
      const voucherId = generateStringAllCaps(10);

      const voucher = await voucherService.createVoucher({
        userId,
        voucherId,
        wallet,
        amount,
        created_by: "admin",
      });

      await walletService.updateTotalTokenGenerated(userId, amount);
      await notificationService.createNotification(
        userId,
        "user",
        `Voucher worth $${amount} generated from ${walletMapping[
          wallet
        ].toUpperCase()} wallet`,
        "voucher"
      );
      await sendNotificationToUser(req, userId);
      return res.status(201).json({
        data: {
          voucher_id: voucherId,
          wallet: wallet,
          amount: amount,
          created_on: Date(),
        },
        success: true,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAllActiveVouchersById: async (req, res, next) => {
    try {
      const userId = req.user?.id;

      const vouchers = await voucherService.getAllActiveVouchersById(userId);
      if (vouchers) {
        res.status(200).json({ data: vouchers, success: true });
      } else {
        res.status(404).json({ message: "Not found", success: false });
      }
    } catch (error) {
      if (error == "") console.log("Error: ", error.sqlMessage);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

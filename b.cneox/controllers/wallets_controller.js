const notificationService = require("../services/notifications_service");
const user_service = require("../services/user_service");
const walletsService = require("../services/wallets_service");
const {
  otpCache,
  otpAttemptsCache,
  blockedUsersCache,
} = require("../utils/cache");
const { generateString } = require("../utils/string-generator");

const { sendNotificationToUser } = require("../utils/notifications");
const { allowedTransferId } = require("../config/config");
const referral_service = require("../services/referral_service");
module.exports = {
  getAllWalletsByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const wallets = await walletsService.getAllWalletsByUserId(userId);

      if (wallets) {
        res.status(200).json({ data: wallets, success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      console.error("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getWalletByUserId: async (req, res, next) => {
    try {
      const { type, userId } = req.params;
      const amount = await walletsService.getWalletByUserId({ type, userId });
      if (amount) {
        res.status(200).json({ data: amount, success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      if (error == "") console.log("Error: ", error.sqlMessage);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllInterWalletTransfer: async (req, res, next) => {
    try {
      const transactions = await walletsService.getAllInterWalletTransfer();
      return res.status(200).json({ data: transactions, success: true });
    } catch (error) {
      if (error == "") console.log("Error: ", error.sqlMessage);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  updateWithdrawalWallet: async (req, res, next) => {
    try {
      const { otp, withdrawal_wallet } = req.body;
      const userId = req.user?.id;
      // Check if the OTP is correct
      const cachedIncorrectAttempts = otpAttemptsCache.get(userId);
      if (cachedIncorrectAttempts >= 3) {
        // Block the user for 1 hour
        blockedUsersCache.set(userId, true);
        return res.status(429).json({
          success: false,
          message: "Too many incorrect OTP attempts. Please try again later.",
        });
      }
      // Retrieve the stored OTP
      const storedOtp = otpCache.get(userId);
      // Check if email exists in users_table
      const userCreds = await user_service.getUserById(userId);
      if (!userCreds || !storedOtp) {
        return res.status(401).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      if (storedOtp !== otp) {
        // Increment incorrect OTP attempts and cache it
        const currentAttempts = cachedIncorrectAttempts
          ? cachedIncorrectAttempts + 1
          : 1;
        otpAttemptsCache.set(userId, currentAttempts);
        return res.status(403).json({
          success: false,
          message: "Wrong OTP",
        });
      }
      if (storedOtp === otp) {
        const withdrawalAddress =
          await walletsService.getWithdrawalAddressByUserId({ userId });
        if (withdrawalAddress.withdrawal_wallet) {
          return res.status(403).json({
            success: false,
            message: "Already exists. Can't edit",
          });
        } else {
          //hash password
          await walletsService.updateWithdrawalWallet(
            userId,
            withdrawal_wallet
          );
          await notificationService.createNotification(
            userId,
            "user",
            `Withdrawal wallet added for your account`,
            "misc"
          );
          await sendNotificationToUser(req, userId);

          // Reset incorrect OTP attempts on successful withdrawal
          otpAttemptsCache.del(userId);
          otpCache.del(userId);
          return res.status(200).json({
            message: "Withdrawal Wallet updated successfully",
            success: true,
          });
        }
      } else {
        return res.status(401).json({
          success: false,
          message: "Error in updating",
        });
      }
    } catch (error) {
      console.log("error in changing password", error);
      if (error == "")
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
    }
  },
  interWalletTransfer: async (req, res, next) => {
    try {
      const {
        amount,
        from_wallet,
        toUserId,
        fromUserId,
        to_wallet,
        otp,
        security_pin,
      } = req.body;
      const userId = req.user?.id;
      //data check
      const requiredFields = [
        { name: "from_wallet", message: "Missing from_wallet field" },
        { name: "toUserId", message: "Missing toUserId field" },
        { name: "otp", message: "Missing otp field" },
        { name: "security_pin", message: "Missing security_pin field" },
        { name: "amount", message: "Missing amount field" },
        { name: "to_wallet", message: "Missing to_wallet field" },
        { name: "fromUserId", message: "Missing fromUserId field" },
      ];

      for (const field of requiredFields) {
        if (!req.body[field.name] || req.body[field.name] === "") {
          return res
            .status(400)
            .json({ success: false, message: field.message });
        }
      }
      if (userId !== allowedTransferId) {
        return res.status(400).json({
          success: false,
          message: "Not Allowed",
        });
      }
      const downlines = await referral_service.findUserDownline(
        allowedTransferId
      );
      if (!downlines?.includes(toUserId) || !downlines?.includes(fromUserId)) {
        return res.status(400).json({
          success: false,
          message: "Not Allowed",
        });
      }
      if (parseFloat(amount) < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid data",
        });
      }
      if (
        from_wallet !== "Interest" &&
        from_wallet !== "ROI" &&
        from_wallet !== "R&B" &&
        to_wallet !== "R&B" &&
        to_wallet !== "ROI" &&
        to_wallet !== "Interest"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid data",
        });
      } // Check if the OTP is correct
      const cachedIncorrectAttempts = otpAttemptsCache.get(userId);
      if (cachedIncorrectAttempts >= 3) {
        // Block the user for 1 hour
        blockedUsersCache.set(userId, true);
        return res.status(429).json({
          success: false,
          message: "Too many incorrect OTP attempts. Please try again later.",
        });
      }
      // Retrieve the stored OTP
      const storedOtp = otpCache.get(userId);

      if (storedOtp !== otp) {
        // Increment incorrect OTP attempts and cache it
        const currentAttempts = cachedIncorrectAttempts
          ? cachedIncorrectAttempts + 1
          : 1;
        otpAttemptsCache.set(userId, currentAttempts);
        return res.status(400).json({
          success: false,
          message: "Wrong OTP",
        });
      }
      const userCreds = await user_service.getUserAndWalletData({
        userId,
      });
      if (parseFloat(userCreds.security_pin) !== parseFloat(security_pin)) {
        return res.status(400).json({
          success: false,
          message: "Wrong security pin",
        });
      }
      const fromUserCreds = await user_service.getUserAndWalletData({
        userId: fromUserId,
      });
      const toUserCreds = await user_service.getUserAndWalletData({
        userId: toUserId,
      });
      if (!fromUserCreds || !toUserCreds) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      if (
        fromUserCreds.status === "suspected" ||
        fromUserCreds.status === "blocked" ||
        toUserCreds.status === "suspected" ||
        toUserCreds.status === "blocked"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Your account is suspended. Kindly reach out to support team",
        });
      }
      // console.log(userCreds);
      if (
        from_wallet === "Interest" &&
        parseFloat(amount) > parseFloat(fromUserCreds.interest_wallet)
      ) {
        return res.status(400).json({
          success: false,
          message: "Transfer amount is greater than available wallet balance",
        });
      }
      if (
        from_wallet === "R&B" &&
        parseFloat(amount) > parseFloat(fromUserCreds.referral_binary_wallet)
      ) {
        return res.status(400).json({
          success: false,
          message: "Transfer amount is greater than available wallet balance",
        });
      }
      console.log(parseFloat(amount), parseFloat(fromUserCreds.roi_wallet));
      if (
        from_wallet === "ROI" &&
        parseFloat(amount) > parseFloat(fromUserCreds.roi_wallet)
      ) {
        return res.status(400).json({
          success: false,
          message: "Transfer amount is greater than available wallet balance",
        });
      }

      await walletsService.interWalletTransfer({
        txn_id: "IW-".concat(generateString(12)) + new Date().getTime(),
        fromUserId,
        toUserId,
        from_wallet,
        to_wallet,
        amount,
      });
      if (from_wallet === "ROI") {
        await walletsService.updateRoiWallet(fromUserId, -amount);
      }
      if (from_wallet === "R&B") {
        await walletsService.updateReferralBinaryWallet(fromUserId, -amount);
      }
      if (from_wallet === "Interest") {
        await walletsService.updateInterestWallet(fromUserId, -amount);
      }
      if (to_wallet === "ROI") {
        await walletsService.updateRoiWallet(toUserId, amount);
      }
      if (to_wallet === "R&B") {
        await walletsService.updateReferralBinaryWallet(toUserId, amount);
      }
      if (to_wallet === "Interest") {
        await walletsService.updateInterestWallet(toUserId, amount);
      }
      // Reset incorrect OTP attempts on successful withdrawal
      otpAttemptsCache.del(userId);
      otpCache.del(userId);

      res
        .status(201)
        .json({ message: "Transaction Successful.", success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

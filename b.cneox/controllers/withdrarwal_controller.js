const withdrawalService = require("../services/withdrawal_service");
const walletService = require("../services/wallets_service");
const userService = require("../services/user_service");
const emailService = require("../services/mail_service");
const { formatToUKTime } = require("../utils/date");
const {
  otpCache,
  otpAttemptsCache,
  blockedUsersCache,
} = require("../utils/cache");
const notificationService = require("../services/notifications_service");
const {
  sendNotificationToAdmin,
  sendNotificationToUser,
} = require("../utils/notifications");
const moment = require("moment-timezone");
const referral_service = require("../services/referral_service");
const { allowedTransferId } = require("../config/config");
const { generateString } = require("../utils/string-generator");

module.exports = {
  getAllWithdrawalsByUserId: async (req, res) => {
    try {
      const userId = req.user?.id;

      const withdrawals = await withdrawalService.getAllWithdrawalsByUserId(
        userId
      );
      res.status(200).json({ data: withdrawals, success: true });
    } catch (error) {
      console.error("Error retrieving withdrawals:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllWithdrawals: async (req, res) => {
    try {
      const withdrawals = await withdrawalService.getAllWithdrawals();
      res.status(200).json({ data: withdrawals, success: true });
    } catch (error) {
      console.error("Error retrieving withdrawals:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAllRBWithdrawals: async (req, res) => {
    try {
      const withdrawals = await withdrawalService.getAllRBWithdrawals();
      res.status(200).json({ data: withdrawals, success: true });
    } catch (error) {
      console.error("Error retrieving withdrawals:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllIntrestWithdrawals: async (req, res) => {
    try {
      const withdrawals = await withdrawalService.getAllIntrestWithdrawals();
      res.status(200).json({ data: withdrawals, success: true });
    } catch (error) {
      console.error("Error retrieving withdrawals:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllROIWithdrawals: async (req, res) => {
    try {
      const withdrawals = await withdrawalService.getAllROIWithdrawals();
      if (withdrawals) {
        for (let withdrawal of withdrawals) {
          const count = await withdrawalService.getUserROIWithdrawalsForMonth(
            withdrawal?.user_id
          );
          withdrawal.count = count?.count;
        }
      }
      res.status(200).json({ data: withdrawals, success: true });
    } catch (error) {
      console.error("Error retrieving withdrawals:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  createWithdrawal: async (req, res, next) => {
    const {
      amount,
      currency,
      from_wallet,
      otp,
      security_pin,
      withdrawalMethod,
    } = req.body;

    const userId = req.user?.id;
    //data check
    const requiredFields = [
      { name: "from_wallet", message: "Missing from_wallet field" },
      { name: "amount", message: "Missing amount field" },
      { name: "otp", message: "Missing otp field" },
      { name: "security_pin", message: "Missing security_pin field" },
      { name: "currency", message: "Missing currency field" },
    ];

    for (const field of requiredFields) {
      if (!req.body[field.name] || req.body[field.name] === "") {
        return res.status(400).json({ success: false, message: field.message });
      }
    }

    if (!["ROI", "Interest", "R&B"].includes(from_wallet)) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect from_wallet_field" });
    }
    // Check if user exists in users_table
    const userCreds = await userService.getUserAndWalletData({ userId });
    if (!userCreds) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId or you are a new user",
      });
    }
    if (userCreds.status === "suspected") {
      return res.status(400).json({
        success: false,
        message: "Your account is suspended. Kindly reach out to support team",
      });
    }
    if (
      userCreds.status === "suspended" &&
      ["ROI", "Interest"].includes(from_wallet)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "The company package target is not met please complete the target and try again",
      });
    }
    if (!userCreds?.withdrawal_wallet) {
      return res
        .status(400)
        .json({ success: false, message: "Withdrawal wallet does not exist" });
    }
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

    if (parseFloat(userCreds.security_pin) !== parseFloat(security_pin)) {
      return res.status(400).json({
        success: false,
        message: "Wrong security pin",
      });
    }

    if (parseFloat(amount) < 20) {
      return res.status(400).json({
        success: false,
        message: "Withdrawal amount should be at least 20",
      });
    }
    const ukDateTime = new Date(moment.tz("Europe/London").format());
    const ukDateOfMonth = ukDateTime.getDate();
    console.log(ukDateOfMonth);
    // if (from_wallet === "Interest" && ![1].includes(ukDateOfMonth)) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "Withdrawal for extra income wallet is only available on 1st of every month",
    //   });
    // }
    if (![5, 10, 20, 25, 30].includes(ukDateOfMonth)) {
      const downlines = await referral_service.findUserDownline(
        allowedTransferId
      );
      if (downlines?.includes(userId) || userId === allowedTransferId) {
        console.log(`User ID ${userId} is in the downlines array.`);
        return res.status(400).json({
          success: false,
          message:
            "Withdrawal only allowed on 5th,10th,20th,25th,30th of every month",
        });
      }
    }
    // Check if user exists in users_table
    const count = await withdrawalService.getUserROIWithdrawalsForMonth(userId);
    if (count?.count >= 5 && from_wallet === "ROI") {
      return res.status(400).json({
        success: false,
        message: "Withdrawals limit exceeded for the month",
      });
    }
    // // Condition for R&B between 9 to 6 UK time
    // if (ukHour < 12 || ukHour > 17) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Withdrawal  is only available from 12 PM to 5 PM UK time",
    //   });
    // }

    // Compare withdrawal amount with wallet amount
    const walletMapping = {
      ROI: "roi_wallet",
      Interest: "interest_wallet",
      "R&B": "referral_binary_wallet",
    };

    let withdraw_amount;
    let deduct_amount;
    if (from_wallet === "R&B" || from_wallet == "r&b") {
      deduct_amount = parseFloat(amount) * 0.0;
      withdraw_amount = parseFloat(amount) - parseFloat(amount) * 0.0;
    } else {
      deduct_amount = parseFloat(amount) * 0.07;
      withdraw_amount = parseFloat(amount) - deduct_amount;
    }
    if (
      parseFloat(userCreds[walletMapping[from_wallet]]) < 15 ||
      parseFloat(amount) > parseFloat(userCreds[walletMapping[from_wallet]])
    ) {
      return res.status(400).json({
        success: false,
        message: "Withdrawal amount is greater than available wallet balance",
      });
    }

    try {
      await withdrawalService.addWithdrawalEntry({
        userId,
        date: formatToUKTime(),
        amount,
        charges: deduct_amount,
        currency,
        from_wallet,
        final_amount: withdraw_amount,
        merchant: userCreds?.withdrawal_wallet,
        withdrawal_id: "WI-".concat(generateString(12)) + new Date().getTime(),
        withdrawalMethod,
      });
      let type;
      switch (from_wallet) {
        case "ROI":
          await walletService.updateRoiWallet(userId, amount * -1);
          type = "roi_withdrawal";
          break;
        case "Interest":
          await walletService.updateInterestWallet(userId, amount * -1);
          type = "interest_withdrawal";
          break;
        case "R&B":
          await walletService.updateReferralBinaryWallet(userId, amount * -1);
          type = "rb_withdrawal";
          break;
      }
      await walletService.updateTotalWithdrawal(userId, amount);
      await notificationService.createNotification(
        userId,
        "user",
        `Request for withdrawal of $${amount} from ${from_wallet} placed successfuly.`,
        type
      );
      await notificationService.createNotification(
        null,
        "admin",
        `${from_wallet}: ${userId} has placed $${amount} withdrawal request`,
        type
      );
      await sendNotificationToAdmin(req);
      await emailService.sendCommonElasticMail({
        to: "adrianciaz81@gmail.com",
        template: "partial",
        variables,
      });
      await sendNotificationToUser(req, userId);
      // Reset incorrect OTP attempts on successful withdrawal
      otpAttemptsCache.del(userId);
      otpCache.del(userId);

      return res.status(200).json({
        success: true,
        message: "Withdrawal entry added successfully",
      });
    } catch (error) {
      console.error("Error creating withdrawal :", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  approveOrRejectWithdrawals: async (req, res, next) => {
    const { txn_ids, status, charges } = req.body;
    const results = [];
    let finalCharges = charges;
    if (!charges) finalCharges = 7;

    for (const txn_id of txn_ids) {
      try {
        // Fetch withdrawal data by txn_id
        const withdrawal = await withdrawalService.getWithdrawalDataByTxnId(
          txn_id
        );

        if (
          !withdrawal ||
          withdrawal.status === "rejected" ||
          withdrawal.status === "approved"
        ) {
          results.push({
            txn_id,
            success: false,
            message: "Transaction not found",
          });
          continue;
        }

        const { user_id, amount, wallet_type: from_wallet, email } = withdrawal;
        const variables = {
          userId: user_id,
          amount: amount,
          wallet: from_wallet.toUpperCase(),
          txn_id: withdrawal?.withdrawal_id,
        };
        // Update the withdrawal status
        await withdrawalService.updateWithdrawalEntry({
          txn_id,
          status,
          txn_date: formatToUKTime(),
          charges: finalCharges,
          final_amount:
            parseFloat(amount) - parseFloat(amount) * (finalCharges / 100),
        });
        let type;
        switch (from_wallet) {
          case "roi":
            type = "roi_withdrawal";
            break;
          case "interest":
            type = "interest_withdrawal";
            break;
          case "r&b":
            type = "rb_withdrawal";
            break;
        }
        if (status === "approved") {
          await notificationService.createNotification(
            user_id,
            "user",
            `$${amount} Withdrawal success from ${from_wallet.toUpperCase()} wallet.`,
            type
          );

          await sendNotificationToUser(req, user_id);
          await emailService.sendCommonElasticMail({
            to: email, // Fetch email using user_id from users_table
            template: "withdrawalsuccess",
            variables,
          });

          results.push({ txn_id, success: true });
        } else {
          await emailService.sendCommonElasticMail({
            to: email, // Fetch email using user_id from users_table
            template: "withdrawaldeclined",
            variables,
          });
          await walletService.updateTotalWithdrawal(user_id, amount * -1);

          switch (from_wallet) {
            case "roi":
              await walletService.updateRoiWallet(user_id, amount); // Assuming deduct_amount is same as amount
              break;
            case "interest":
              await walletService.updateInterestWallet(user_id, amount);
              break;
            case "r&b":
              await walletService.updateReferralBinaryWallet(user_id, amount);
              break;
          }
          await notificationService.createNotification(
            user_id,
            "user",
            `$${amount} Withdrawal rejcted from ${from_wallet.toUpperCase()} wallet.`,
            type
          );

          await sendNotificationToUser(req, user_id);
          results.push({ txn_id, success: true, message: "Declined" }); // Assuming transferData isn't relevant here
        }
      } catch (error) {
        console.error("Error:", error);
        results.push({
          txn_id,
          success: false,
          message: "Internal Server Error",
        });
      }
    }

    res.status(200).json({ data: results });
  },
};

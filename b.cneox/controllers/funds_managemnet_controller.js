const fundsService = require("../services/funds_service");
const walletService = require("../services/wallets_service"); // Make sure you import your walletService.
const userService = require("../services/user_service");

const { formatToUKTime } = require("../utils/date");
const notificationService = require("../services/notifications_service");
const {
  sendNotificationToUser,
  sendNotificationToAdmin,
} = require("../utils/notifications");
module.exports = {
  // Create an entry

  createEntry: async (req, res, next) => {
    try {
      const { wallet, amount, userid, type, admin } = req.body;
      const date = formatToUKTime(); // There was a typo in your code, 'data' should be 'date'
      //type=add/remove
      // Check for required fields
      const requiredFields = [
        { name: "userid", message: "Missing userId field" },
        { name: "amount", message: "Missing amount field" },
        { name: "admin", message: "Missing admin field" },
        { name: "type", message: "Missing type field" },
        { name: "wallet", message: "Missing wallet field" },
      ];

      for (const field of requiredFields) {
        if (!req.body[field.name] || req.body[field.name] === "") {
          return res
            .status(400)
            .json({ success: false, message: field.message });
        }
      }

      // Check if user exists
      const user = await userService.getUserNameById(userid);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
      let finalAmount;
      if (type === "add") {
        finalAmount = amount;
      } else {
        finalAmount = amount * -1;
      }
      // Handle wallet update
      switch (wallet) {
        case "interest":
          await walletService.updateInterestWallet(userid, finalAmount);
          break;
        case "roi":
          await walletService.updateRoiWallet(userid, finalAmount);
          break;
        case "r&b":
          await walletService.updateReferralBinaryWallet(userid, finalAmount);
          break;

        default:
          return res
            .status(400)
            .json({ success: false, message: "Invalid wallet type" });
      }

      // Create the entry after updating the wallet
      const result = await fundsService.createEntry({
        date,
        admin,
        wallet,
        amount,
        userid,
        type,
        updated_date: date,
      });
      await notificationService.createNotification(
        userid,
        "user",
        `Funds have been ${type}ed to your ${wallet}`,
        "fund_management"
      );
      await sendNotificationToUser(req, userid);

      await notificationService.createNotification(
        null,
        "admin",
        `Funds have been ${type}ed to ${userid} in ${wallet}`,
        "fund_management"
      );
      await sendNotificationToAdmin(req);
      return res.status(200).json({
        success: true,
        message: "Entry created successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  // Retrieve all entries
  getAllEntries: async (req, res, next) => {
    try {
      const entries = await fundsService.getAllEntries();
      res.status(200).json({ success: true, data: entries });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Update an entry
  updateEntry: async (req, res, next) => {
    try {
      const { id, date, admin, wallet, amount, userid, type } = req.body;

      // Get the current entry from the database.
      const currentEntry = await fundsService.getEntry(id);
      const updated_date = new Date();
      if (!currentEntry) {
        return res
          .status(404)
          .json({ success: false, message: "Entry not found." });
      }

      // Calculate the difference between the old and new amount.
      const difference = amount - currentEntry.amount;

      // Based on the difference, decide whether to add or remove the amount.
      if (difference !== 0) {
        switch (wallet) {
          case "interest":
            await walletService.updateInterestWallet(userid, difference);
            break;
          case "roi":
            await walletService.updateRoiWallet(userid, difference);
            break;
          case "r&b":
            await walletService.updateReferralBinaryWallet(userid, difference);
            break;

          default:
            return res
              .status(400)
              .json({ success: false, message: "Invalid wallet type" });
        }
      }

      // Update the entry in the database.
      const result = await fundsService.updateEntry({
        id,
        date,
        admin,
        wallet,
        amount,
        userid,
        type,
        updated_date,
      });

      res.status(200).json({
        success: true,
        message: "Entry updated successfully",
        data: result,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Delete an entry
  deleteEntry: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Get the current entry from the database.
      const currentEntry = await fundsService.getEntry(id);

      if (!currentEntry) {
        return res
          .status(404)
          .json({ success: false, message: "Entry not found." });
      }

      // Decrease the user's wallet by the amount in the current entry.
      switch (currentEntry.wallet) {
        case "deposit":
          await walletService.updateDepositWallet(
            currentEntry.userid,
            -currentEntry.amount
          );
          break;
        case "interest":
          await walletService.updateInterestWallet(
            currentEntry.userid,
            -currentEntry.amount
          );
          break;
        case "roi":
          await walletService.updateRoiWallet(
            currentEntry.userid,
            -currentEntry.amount
          );
          break;
        case "r&b":
          await walletService.updateReferralBinaryWallet(
            currentEntry.userid,
            -currentEntry.amount
          );
          break;

          break;
        default:
          return res
            .status(400)
            .json({ success: false, message: "Invalid wallet type" });
      }

      await fundsService.deleteEntry(id);

      res
        .status(200)
        .json({ success: true, message: "Entry deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

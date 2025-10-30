//custom modules
const userService = require("../services/user_service");
const bcrypt = require("bcryptjs");
const emailService = require("../services/mail_service");
const careerRewardsService = require("../services/career_rewards_service");
const { getUKTime } = require("../utils/date");
const { createReferralInvestment } = require("./investments_controller");
const admin_service = require("../services/admin_service");
const roiService = require("../services/roi_transactions_service");
const walletService = require("../services/wallets_service");
const { getLatestReferralAndBinary } = require("../services/referral_service");
const { getAllWithdrawalsByUserId } = require("../services/withdrawal_service");
const { getInvestmentsByUserId } = require("../services/invetsments_service");
const { getVouchersByWallets } = require("../services/voucher_service");
const {
  getBinaryTreeEntryByUserId,
} = require("../services/binary_tree_service");
const binary_transaction_service = require("../services/binary_transaction_service");
const referral_transactions_service = require("../services/referral_transactions_service");
function handleNullOrNaN(value) {
  return value !== null && value !== undefined ? parseFloat(value) : 0;
}
const transformData = (dbData, role) => {
  return dbData.map((record, index) => {
    const commonFields = {
      serialNumber: dbData.length - index,
      user: {
        id: record.userId,
        name: record.name,
        verified: record.verified,
      },
      wallet: {
        interest: record.interest,
        rnb: record.rnb,
        roi: record.roi,
      },
      position: record.position,
      sponsor: {
        id: record.referrer_id,
        name: record.sponsorName,
      },

      status: record.status,
      securityPin: record.security_pin,
      action: "",
      createdAt: record.createdAt,
    };

    // Check the role and include additional fields accordingly
    if (role !== 0) {
      return {
        ...commonFields,
        countryAndPhone: `${record.country}, ${record.phone}`,
        user: {
          ...commonFields.user,
          email: record.email,
        },
        sponsor: {
          ...commonFields.sponsor,
          email: record.sponsorEmail,
        },
        packages: {
          name: record.packages,
          totalInvestment: record.totalInvestment,
        },
      };
    } else {
      return {
        ...commonFields,
      };
    }
  });
};

module.exports = {
  getUserDashboardData: async (req, res, next) => {
    try {
      const userId = req.user?.id;
      console.log(userId);
      const user = await userService.getUserDashboardData(userId);
      let exists;
      const withdrawalAddress =
        await walletService.getWithdrawalAddressByUserId({ userId });
      console.log(withdrawalAddress);
      if (withdrawalAddress.withdrawal_wallet) {
        exists = true;
      } else {
        exists = false;
      }
      user.isWithdrawalWalletUpdated = exists;
      user.latestTransactions = await userService.getUserLatestTransactions(
        userId
      );
      user.latestROI = await roiService.getROITransactionsByUserIdWithLimit(
        userId
      );
      user.latestRnB = await getLatestReferralAndBinary(userId);
      user.latestExtraIncome =
        await careerRewardsService.getAllCareerRewardsByUserIdLimit(userId);
      res.status(200).json({ data: user, success: true });
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { userId, status } = req.body;
      console.log(status, userId);
      const updatedRowCount = await userService.updateUserStatus({
        userId,
        newStatus: status,
      });

      if (updatedRowCount < 1) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res
        .status(200)
        .json({ success: true, message: "Status updated successfully" });
    } catch (error) {
      console.log("Error: ", error.sqlMessage);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  //get user details by id
  getUserById: async (req, res, next) => {
    try {
      const id = req.user?.id;
      const user = await userService.getUserById(id);
      if (user) {
        res.status(200).json({ data: user, success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      if (error == "") console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getUserDataByUserId: async (req, res, next) => {
    try {
      const id = req.user?.id;
      const user = await userService.getUserDataByUserId(id);
      const wallet = await userService.getUserAndWalletData({ userId: id });
      user.withdrawal_wallet = wallet?.withdrawal_wallet;
      if (user) {
        res.status(200).json({ data: user, success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      if (error == "") console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getUserDataByUserIdForAdmin: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserDataByUserIdForAdmin(id);
      if (user) {
        res.status(200).json({ data: user, success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getUserKundli: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await userService.getUserKundli(id);

      if (user) {
        const total_roi = await roiService.getTotalROIByUser(id);
        const career_level = await careerRewardsService.getUserCareerLevels(id);
        const reward_sum = await admin_service.getUserRewardSum(id);
        const investment = await admin_service.getInvestmentInfo(id);
        const withdrawal = await admin_service.getWithdrawalInfo(id);
        const wallet = await walletService.getBioWallets(id);
        const withdrawals = await getAllWithdrawalsByUserId(id);
        const binaryTransactions =
          await binary_transaction_service.getBinaryTransactionsByUserId(id);
        const referralTransactions =
          await referral_transactions_service.getReferralTransactionsByUserId(
            id
          );
        const voucher = await getVouchersByWallets(id);
        const investments = await getInvestmentsByUserId(id);
        const binaryEntry = await getBinaryTreeEntryByUserId(id);
        //investments
        user.total_investment = wallet?.total_investment;
        user.cash_investment = investment?.cash_investment;
        user.voucher_investment = investment?.voucher_investment;
        user.downline_investment = investment?.downline_investment;
        user.powerleg_investment = investment?.powerleg_investment;
        user.last_investment_date = investment?.last_investment_date;
        user.free_investment = investment?.free_investment;
        //withdrawals
        user.total_withdrawal = wallet?.total_withdrawal;
        user.withdrawal_interest = withdrawal?.withdrawal_interest;
        user.withdrawal_rnb = withdrawal?.withdrawal_rnb;
        user.withdrawal_roi = withdrawal?.withdrawal_roi;
        //current wallet balances
        user.roi_wallet = wallet?.roi_wallet;
        user.interest_wallet = wallet?.interest_wallet;
        user.referral_binary_wallet = wallet?.referral_binary_wallet;
        //earnings so far
        user.total_earning = wallet?.total_earning;
        user.binary_wallet = wallet?.binary_wallet;
        user.referral_wallet = wallet?.referral_wallet;
        user.total_roi = total_roi[0]?.amount;
        user.career_rewards = reward_sum?.career_rewards;
        //wallet extra data
        user.total_deposit = wallet?.total_deposit;
        user.direct_business = wallet?.direct_business;
        //binary
        user.left_business = binaryEntry?.left_business;
        user.right_business = binaryEntry?.right_business;
        //vouchers
        user.toal_voucher_generated = wallet?.toal_voucher_generated;
        user.total_voucher_investment = wallet?.total_voucher_investment;
        user.roi_generated_voucher = voucher?.roi_generated_voucher;
        user.rnb_generated_voucher = voucher?.rnb_generated_voucher;
        user.interest_generated_voucher = voucher?.interest_generated_voucher;

        user.binary_career_level = career_level?.binary_career_level;

        user.withdrawals = withdrawals;
        user.investments = investments;
        user.binaryTransactions = binaryTransactions;
        user.referralTransactions = referralTransactions;

        res.status(200).json({ data: user, success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllUsersData: async (req, res) => {
    try {
      const users = await userService.getAllUserData();
      const transformedResults = transformData(users, req.user.role);
      return res.status(200).json({ data: transformedResults, success: true });
    } catch (error) {
      console.log("Error: ", error.sqlMessage || error.message);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getUserNameById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await userService.getUserNameById(id);
      if (user) {
        res.status(200).json({ data: user, success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      if (error == "") console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      if (users) {
        res.status(200).json({ data: users, success: true });
      } else {
        res.status(404).json({ message: "Users not found", success: false });
      }
    } catch (error) {
      if (error == "")
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
    }
  },
  fetchAllUsersData: async (req, res, next) => {
    try {
      const users = await userService.fefchAllUsersData();
      if (users) {
        res.status(200).json({ data: users, success: true });
      } else {
        res.status(404).json({ message: "Users not found", success: false });
      }
    } catch (error) {
      if (error == "")
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
    }
  },

  //get user by id
  getUserIdByEmail: async (req, res, next) => {
    try {
      const email = req.params.email;
      const user = await userService.findByEmail({ email });

      if (user) {
        res.status(200).json({ data: user, success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
    } catch (error) {
      if (error == "")
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
    }
  },

  //get user details by id
  getSponsorById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const sponsor = await userService.getSponsorById(id);
      if (sponsor) {
        res.status(200).json({ data: sponsor, success: true });
      } else {
        res.status(404).json({ message: "Sponsor not found", success: false });
      }
    } catch (error) {
      if (error == "")
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
    }
  },

  //Mark User Email as Verified
  markUserEmailVerified: async (req, res, next) => {
    try {
      const { email } = req.body;

      await userService.markUserEmailVerified({
        email,
      });
      res
        .status(200)
        .json({ success: true, message: "Email Verification Compelted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  //verify user by PIN
  verifyUserByPin: async (req, res, next) => {
    try {
      const { userId, pin } = req.body;

      const user = await userService.verifyUserByPin({
        userId,
        pin,
      });
      if (user.length == 1) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(401).json({ success: false, message: "Incorrect PIN" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },

  // update or forgot password
  updatePassword: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      //hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      console.log(email, password, hashedPassword);

      await userService.updatePassword({
        email,
        hashedPassword,
        newPassword: password,
      });
      res.status(200).json({ success: true, message: "Password updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // update profile
  updateProfile: async (req, res, next) => {
    try {
      const id = req.user?.id;
      // const { name, emailTobeUpdated, country, phoneNo, dob } = req.body;
      const { name, country, phoneNo, dob } = req.body;
      console.log("updating profile");
      await userService.updateProfile({
        id,
        name,

        country,
        phoneNo,
        dob,
      });
      res.status(200).json({ success: true, message: "Profile updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  updateProfileAdmin: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        name,
        phone,
        country,
        securityPin,
        emailToBeUpdated,
        withdrawal_wallet,
      } = req.body;

      await userService.updateProfileAdmin({
        id,
        name,
        phone,
        country,
        securityPin,
        withdrawal_wallet,
        email: emailToBeUpdated,
      });
      await walletService.updateWithdrawalWallet(id, withdrawal_wallet);

      res.status(200).json({ success: true, message: "Profile updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  updateuserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, country, phone } = req.body;

      await userService.updateuserById({
        id,
        name,
        email,
        country,
        phone,
      });
      res.status(200).json({ success: true, message: "Profile updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  getNotificationSettingsById: async (req, res, next) => {
    const id = req.user?.id;
    try {
      const notificationSettings =
        await userService.getNotificationSettingsById(id);

      res.status(200).json({
        success: true,
        data: notificationSettings,
      });
    } catch (error) {
      console.error("Error:", error.sqlMessage || error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  updateNotificationSettings: async (req, res, next) => {
    const { id } = req.user;

    try {
      const notificationSettings =
        await userService.updateNotificationSettingsById(id, req.body);

      res.status(200).json({
        success: true,
        data: notificationSettings,
      });
    } catch (error) {
      console.error("Error:", error.sqlMessage || error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  credentials: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userService.getUserById(userId);
      if (!user) {
        return res
          .status(400)
          .json({ message: "User does not exist", status: false });
      }
      const variables = {
        username: user?.name,
        userid: userId,
        email: user?.email,
        pin: user?.security_pin,
        withdrawal_wallet: user?.withdrawal_wallet || "-",
      };

      await emailService.sendCommonElasticMail({
        to: user?.email,
        template: "credentials",
        variables,
      });

      res
        .status(200)
        .json({ success: true, message: "Credentials Sent Successfully." });
    } catch (error) {
      console.error("Error:", error.sqlMessage || error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getDailyReport: async (req, res, next) => {
    try {
      const report = await userService.getDailyReport();
      res.status(200).json({ data: report, success: true });
    } catch (error) {
      console.log("Error: ", error.sqlMessage || error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getReports: async (req, res, next) => {
    try {
      // Call the report service to get the reports
      const reports = await userService.getReports();

      // Initialize accumulators for last 7 and 30 days
      let last7Days = {
        total_cash_deposit: 0,
        total_roi_withdrawal: 0,
        total_rnb_withdrawal: 0,
      };
      let last30Days = {
        total_cash_deposit: 0,
        total_roi_withdrawal: 0,
        total_rnb_withdrawal: 0,
      };

      const summarizedReports = {};
      reports.forEach((report) => {
        report.data.forEach((entry) => {
          const date = entry.date.toISOString().split("T")[0]; // Format date as 'yyyy-mm-dd'

          if (!summarizedReports[date]) {
            summarizedReports[date] = {
              date: date,
              total_signups: 0,
              investment: 0,
              powerleg_investment: 0,
              free_investment: 0,
              roi_withdrawal: 0,
              interest_withdrawal: 0,
              rnb_withdrawal: 0,
              token_investment: 0,
              cash_investment: 0,
            };
          }

          // Handle null values and conversion to numbers using parseFloat
          summarizedReports[date].total_signups += handleNullOrNaN(
            entry.total_users_registered
          );
          summarizedReports[date].investment += handleNullOrNaN(
            entry.total_self_investment
          );
          summarizedReports[date].powerleg_investment += handleNullOrNaN(
            entry.total_powerleg_investment
          );
          summarizedReports[date].free_investment += handleNullOrNaN(
            entry.total_free_investment
          );
          summarizedReports[date].token_investment += handleNullOrNaN(
            entry.total_token_investment
          );
          summarizedReports[date].cash_investment += handleNullOrNaN(
            entry.total_cash_investment
          );
          summarizedReports[date].roi_withdrawal += handleNullOrNaN(
            entry.total_roi_withdrawal
          );
          summarizedReports[date].interest_withdrawal += handleNullOrNaN(
            entry.total_interest_withdrawal
          );
          summarizedReports[date].rnb_withdrawal += handleNullOrNaN(
            entry.total_rnb_withdrawal
          );

          // Calculate totals for last 7 and 30 days
          const entryDate = new Date(entry.date);
          const today = new Date();
          const diffInDays = (today - entryDate) / (1000 * 60 * 60 * 24);

          if (diffInDays <= 7) {
            last7Days.total_cash_deposit += handleNullOrNaN(
              entry.total_cash_investment || 0
            );
            last7Days.total_roi_withdrawal += handleNullOrNaN(
              entry.total_roi_withdrawal
            );
            last7Days.total_rnb_withdrawal += handleNullOrNaN(
              entry.total_rnb_withdrawal
            );
          }

          if (diffInDays <= 30) {
            last30Days.total_cash_deposit += handleNullOrNaN(
              entry.total_cash_investment
            );
            last30Days.total_roi_withdrawal += handleNullOrNaN(
              entry.total_roi_withdrawal
            );
            last30Days.total_rnb_withdrawal += handleNullOrNaN(
              entry.total_rnb_withdrawal
            );
          }
        });
      });

      // Convert summarized reports to an array and include last 7 and 30 days data
      const summarizedReportsArray = Object.values(summarizedReports);
      summarizedReportsArray.push({ period: "last_7_days", ...last7Days });
      summarizedReportsArray.push({ period: "last_30_days", ...last30Days });

      res.status(200).json({ data: summarizedReportsArray, success: true });
    } catch (error) {
      console.log("Error in fetching and summarizing reports:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getReportByCountry: async (req, res, next) => {
    try {
      const { country } = req.params;
      const report = await userService.getReportByCountry(country);

      res.status(200).json({ data: report, success: true });
    } catch (error) {
      console.log("Error:", error.sqlMessage || error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

const referralService = require("../services/referral_service");
const userService = require("../services/user_service");
const walletService = require("../services/wallets_service");
module.exports = {
  //get binary tree by user id
  getBinaryTreeByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user_id = req?.user?.id;
      const currentUserNumericId = parseInt(user_id.split("-")[1]);
      const requestedUserNumericId = parseInt(userId.split("-")[1]);
      console.log(currentUserNumericId, requestedUserNumericId);
      // Check if the requested user id is greater than or equal to the current user's id
      if (currentUserNumericId > requestedUserNumericId) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to access this user's binary tree.",
        });
      }
      const binaryEntries = await referralService.getAllbinaryTreesByUser(
        user_id,
        userId
      );
      if (binaryEntries?.length === 0) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to access this user's binary tree.",
        });
      }
      const binaryTree = await referralService.getBinaryTreeByUserId1(userId);
      res.status(200).json({ data: binaryTree, success: true });
    } catch (error) {
      console.log("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getBinaryTreeByUserIdAdmin: async (req, res, next) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      const binaryTree = await referralService.getBinaryTreeByUserId1(userId);
      res.status(200).json({ data: binaryTree, success: true });
    } catch (error) {
      console.log("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getReferralsByReferredId: async (req, res) => {
    try {
      const referredId = req.params.referredId;

      // Get referrals by referred id
      const referrals = await referralService.getReferralsByReferredId(
        referredId
      );
      const referralData = await Promise.all(
        referrals.map(async (referral) => {
          const userData = await userService.getUserById(referral.referrer_id);
          const walletData = await walletService.getAllWalletsByUserId(
            referral.referrer_id
          );
          return {
            referral,
            userData,
            walletData,
          };
        })
      );

      res.status(200).json({ data: referralData, success: true });
    } catch (error) {
      console.error("Error retrieving referrals by referred id:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getReferralsByReferrerId: async (req, res) => {
    try {
      const referrerId = req.user?.id;
      // console.log(referrerId);
      // Get referrals by referred id
      const referrals = await referralService.getReferralsByReferrerId(
        referrerId
      );
      // console.log(referrals);
      const referralData = await Promise.all(
        referrals.map(async (referral) => {
          const userData = await userService.getUserById(referral.referred_id);
          const walletData = await walletService.getAllWalletsByUserId(
            referral.referred_id
          );
          return {
            referral,
            userData,
            walletData,
          };
        })
      );
      // console.log(referralData);
      res.status(200).json({ data: referralData, success: true });
    } catch (error) {
      console.error("Error retrieving referrals by referred id:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getDirectReferralsByReferredId: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Get referrals by referred id
      const referrals = await referralService.getDirectReferralsByUserId(
        userId
      );
      // Get user and wallet data for each referral
      const referralData = await Promise.all(
        referrals.map(async (referral) => {
          const userData = await userService.getUserById(referral.referrer_id);
          const walletData = await walletService.getAllWalletsByUserId(
            referral.referrer_id
          );
          return {
            referral,
            userData,
            walletData,
          };
        })
      );

      res.status(200).json({ data: referralData, success: true });
    } catch (error) {
      console.error("Error retrieving referrals by referred id:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllReferrals: async (req, res) => {
    try {
      const referrals = await referralService.getAllReferrals();

      res.status(200).json({ data: referrals, success: true });
    } catch (error) {
      console.error("Error retrieving referrals:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  findUserDownline: async (req, res) => {
    try {
      const userId = req.user?.id;
      const downlines = await referralService.getDownlineInfo(userId);
      res.status(200).json({ data: downlines, success: true });
    } catch (error) {
      console.error("Error retrieving downline:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

const investmentService = require("../services/invetsments_service");
const referralTransactionService = require("../services/referral_transactions_service");
const referralService = require("../services/referral_service");
const walletService = require("../services/wallets_service");
const binaryTransactionService = require("../services/binary_transaction_service");
const userService = require("../services/user_service");
const binaryTreeService = require("../services/binary_tree_service");
const careerRewardsService = require("../services/career_rewards_service");
const packageService = require("../services/packages_master_service");
const { generateString } = require("../utils/string-generator");
const { generateStringAllCaps } = require("../utils/string-generator");
const admin_service = require("../services/admin_service");
const emailService = require("../services/mail_service");
const { formatDateToYMD, getUKTime, formatToUKTime } = require("../utils/date");
const {
  sendNotificationToUser,
  sendNotificationToAdmin,
} = require("../utils/notifications");
const voucher_service = require("../services/voucher_service");
const notificationService = require("../services/notifications_service");
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
  getDownlineInvestmentsByUserId: async (req, res) => {
    try {
      const userId = req.user?.id;

      const investments =
        await investmentService.getDownlineInvestmentsByUserId(userId);

      if (investments) {
        res.status(200).json({ data: investments, success: true });
      } else {
        res
          .status(404)
          .json({ message: "Investment not found", success: false });
      }
    } catch (error) {
      console.error("Error retrieving investments:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllInvestments: async (req, res) => {
    try {
      const investments = await investmentService.getAllInvestments();

      if (investments) {
        res.status(200).json({ data: investments, success: true });
      } else {
        res
          .status(404)
          .json({ message: "Investments not found", success: false });
      }
    } catch (error) {
      console.error("Error retrieving investment:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getInvestmentById: async (req, res) => {
    try {
      const investmentId = req.params.investmentId;
      const investments = await investmentService.getInvestmentById(
        investmentId
      );

      for (let i = 0; i < investments.length; i++) {
        const investment = investments[i];
        const invest = await investmentService.getInvestmentById(
          investment.investment_id
        );

        if (invest?.package_id) {
          const packageId = investment?.package_id;
          const packageDetails = await packageService.getPackageById(packageId);
          investment.package = packageDetails.package_name;
        }
      }
      if (investments) {
        res.status(200).json({ data: investments, success: true });
      } else {
        res
          .status(404)
          .json({ message: "Investment not found", success: false });
      }
    } catch (error) {
      console.error("Error retrieving investment:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getInvestmentsByUserId: async (req, res) => {
    try {
      const userId = req.user?.id;
      const investments = await investmentService.getInvestmentsByUserId(
        userId
      );

      if (investments) {
        res.status(200).json({ data: investments, success: true });
      } else {
        res
          .status(404)
          .json({ message: "Investment not found", success: false });
      }
    } catch (error) {
      console.error("Error retrieving investments:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  createInvestment: async ({
    user_id,
    sponsor,
    package_id,
    invested_amount,
    deposit_amount,
    token_amount,
    email,
    txn_id,
    crypto_type,
    voucher_id,
    type,
    newAmount,
    newStatus,
    req,
    res,
  }) => {
    try {
      console.log(
        user_id,
        sponsor,
        package_id,
        invested_amount,
        deposit_amount,
        token_amount,
        email,
        txn_id,
        crypto_type,
        voucher_id,
        newAmount,
        type
      );

      //now calculate business days excluding weekend
      const packageData = await packageService.getPackageById(package_id);
      const duration = packageData?.duration;
      const investment_date = getUKTime();
      const expires_on = addBusinessDays(new Date(), duration);
      const userData = userService.getUserAndWalletData({ userId: user_id });
      const city = userData?.city;
      // if (
      //   city &&
      //   (city.toLowerCase() === "kano" || city.toLowerCase() === "kaduna")
      // ) {
      //   invested_amount =
      //     parseFloat(invested_amount) + parseFloat(invested_amount) * 0.05;
      // }
      //now to save in invetsmnet table create txn id and type
      // if (package_id === 1) {
      //   invested_amount =
      //     parseFloat(invested_amount) + parseFloat(invested_amount) * 0.1;
      // }
      // if (package_id === 2) {
      //   invested_amount =
      //     parseFloat(invested_amount) + parseFloat(invested_amount) * 0.1;
      // }
      // if (package_id === 3) {
      //   invested_amount =
      //     parseFloat(invested_amount) + parseFloat(invested_amount) * 0.1;
      // }
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
      if (voucher_id !== "NA" && parseFloat(token_amount) > 0) {
        if (type === "self") {
          await walletService.updateTotalVoucherInvestment(
            user_id,
            token_amount
          );
          await notificationService.createNotification(
            user_id,
            "user",
            `Voucher ${voucher_id} worth $${token_amount} used for investing`,
            "voucher"
          );
          await sendNotificationToUser(req, user_id);
        } else {
          await walletService.updateTotalVoucherInvestment(
            sponsor,
            token_amount
          );
          await notificationService.createNotification(
            sponsor,
            "user",
            `Voucher ${voucher_id} worth $${token_amount} used for investing`,
            "voucher"
          );
          await sendNotificationToUser(req, sponsor);
        }

        await voucher_service.updateVoucherStatus({
          voucher_id,
          newStatus,
          newAmount,
        });
      }
      //update referral bonus
      await module.exports.handleReferrals(
        user_id,
        deposit_amount,
        packageData,
        investment_date,
        package_id,
        investment,
        req
      );

      //update binary bonus
      await module.exports.updateBinaryBusinessVolumeAndCalculateBonus(
        user_id,

        deposit_amount,
        req
      );

      //now send mail
      const variables = {
        date: formatDateToYMD(investment_date),
        package: packageData.package_name,
        userId: user_id,
        amount: invested_amount,
      };

      await emailService.sendCommonElasticMail({
        to: email,
        template: "newpackage",
        variables,
      });
    } catch (error) {
      console.error("Error creating investment:", error);
      return error;
    }
  },
  updateBinaryController: async (req, res) => {
    try {
      const {
        user_id,

        invested_amount,
      } = req.body;
      await module.exports.removeBinaryBusinessVolumeAndCalculateBonus(
        user_id,

        invested_amount
      );

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error creating investment:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  createInvestmentAdmin: async (req, res) => {
    try {
      const {
        user_id,

        package_id,
        amount,
        gateway,
        email,
      } = req.body;

      //first check user exsits and wallet amount is sufficient
      const userWallet = await userService.getUserAndWalletData({
        userId: user_id,
      });
      if (!userWallet) {
        return res.status(401).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }

      let newAmount;
      let newStatus;
      await module.exports.createInvestment({
        user_id,
        sponsor: null,
        package_id: package_id,
        invested_amount: amount,
        deposit_amount: amount,
        token_amount: 0,
        email: userWallet?.email,
        txn_id: "AD-".concat(generateString(12)) + new Date().getTime(),
        crypto_type: gateway,
        voucher_id: "NA",
        type: "admin",
        newAmount,
        newStatus,
        req,
        res,
      });
      const t = await admin_service.createActivatedPackage(req.body);

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error creating investment:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  handleReferrals: async (
    user_id,
    invested_amount,
    packageData,
    investment_date,
    package_id,
    investment,
    req
  ) => {
    const referrals = await referralService.getReferralsByReferredId(user_id);
    if (referrals.length > 0) {
      // Loop through each referral
      for (const referral of referrals) {
        if (referral.referrer_id !== "CROWN-000000") {
          const { parent_id } = referral;
          if (invested_amount) {
            // Calculate the referral bonus based on the level
            let referralBonus;
            const level = parent_id;

            if (level === 1) {
              await walletService.updateDirectBusinessWallet(
                referral.referrer_id,
                invested_amount
              );

              // referralBonus = invested_amount * (10 / 100); // Using the value from packageData
              referralBonus =
                invested_amount * (packageData?.level_one_referral / 100); // Using the value from packageData
              // Create a referral transaction entry

              await referralTransactionService.createReferralTransaction(
                referral.referrer_id,
                package_id,
                referralBonus,
                investment_date,
                user_id,
                investment.investment_id
              );
              await walletService.updateReferralWallet(
                referral.referrer_id,
                referralBonus
              );
              await walletService.updateReferralBinaryWallet(
                referral.referrer_id,
                referralBonus
              );
              await notificationService.createNotification(
                referral.referrer_id,
                "user",
                `Congrats! Referral worth $${referralBonus} credited in R&B wallet upon investment by ${user_id} `,
                "referral"
              );
              await sendNotificationToUser(req, referral.referrer_id);
            }
          }
        }
      }
    }
  },
  updateBinaryBusinessVolumeAndCalculateBonus: async (
    userId,
    businessVolume,
    req
  ) => {
    console.log("in binary business");
    let entry = await binaryTreeService.getBinaryTreeEntryByUserId(userId);
    if (!entry) return;
    let i = 0;
    const capping_limit = await binaryTreeService.getCappingLimitOfUser(
      entry?.user_id
    );
    entry.capping_limit = parseFloat(capping_limit);
    entry.actual_due = Math.min(
      parseFloat(entry.binary_due),
      parseFloat(capping_limit)
    );
    await binaryTreeService.updateBinaryTreeEntry(entry); // Update the binary tree entry with new values

    while (entry && entry?.parent_id) {
      entry = await binaryTreeService.getBinaryTreeEntryByUserId(
        entry?.parent_id
      );
      position = entry?.left_child === userId ? "left" : "right";
      const capping_limit = await binaryTreeService.getCappingLimitOfUser(
        entry?.user_id
      );
      entry.capping_limit = capping_limit;
      // console.log(i, entry, position);
      if (position === "left") {
        entry.left_business =
          parseFloat(entry?.left_business) + parseFloat(businessVolume);
        if (parseFloat(entry?.right_carry) > 0) {
          const minBusiness = Math.min(
            parseFloat(businessVolume),
            parseFloat(entry?.right_carry)
          );
          const binaryBonus = Math.min(minBusiness * 0.1);
          const updateBinaryBusiness =
            parseFloat(binaryBonus) + parseFloat(entry.binary_due);
          entry.binary_due = updateBinaryBusiness;
          entry.matching_due =
            parseFloat(minBusiness) + parseFloat(entry.matching_due);
          entry.actual_due = Math.min(
            updateBinaryBusiness,
            parseFloat(capping_limit)
          );

          entry.left_carry = parseFloat(businessVolume) - minBusiness;
          entry.right_carry = parseFloat(entry?.right_carry) - minBusiness;
        } else if (
          parseFloat(entry?.right_carry) === 0 &&
          parseFloat(entry?.left_carry) > 0
        ) {
          entry.left_carry =
            parseFloat(businessVolume) + parseFloat(entry?.left_carry);
        } else if (
          parseFloat(entry?.left_carry) === 0 &&
          parseFloat(entry?.right_carry) === 0 &&
          parseFloat(entry?.left_business) - parseFloat(businessVolume) ===
            parseFloat(entry?.right_business) &&
          parseFloat(entry?.right_business) > 0
        ) {
          entry.left_carry =
            parseFloat(businessVolume) + parseFloat(entry?.left_carry);
        } else if (parseFloat(entry?.right_business) > 0) {
          const minBusiness = Math.min(
            parseFloat(businessVolume),
            parseFloat(entry?.right_business)
          );
          const binaryBonus = Math.min(minBusiness * 0.1);
          const updateBinaryBusiness =
            parseFloat(binaryBonus) + parseFloat(entry.binary_due);
          entry.binary_due = updateBinaryBusiness;
          entry.matching_due =
            parseFloat(minBusiness) + parseFloat(entry.matching_due);

          entry.actual_due = Math.min(
            updateBinaryBusiness,
            parseFloat(capping_limit)
          );

          entry.left_carry = parseFloat(businessVolume) - minBusiness;
          entry.right_carry = parseFloat(entry?.right_business) - minBusiness;
        }
      } else if (position === "right") {
        entry.right_business =
          parseFloat(entry?.right_business) + parseFloat(businessVolume);
        if (parseFloat(entry?.left_carry) > 0) {
          const minBusiness = Math.min(
            parseFloat(businessVolume),
            parseFloat(entry?.left_carry)
          );
          const binaryBonus = Math.min(minBusiness * 0.1);
          const updateBinaryBusiness =
            parseFloat(binaryBonus) + parseFloat(entry.binary_due);
          entry.binary_due = updateBinaryBusiness;
          entry.matching_due =
            parseFloat(minBusiness) + parseFloat(entry.matching_due);

          entry.actual_due = Math.min(
            updateBinaryBusiness,
            parseFloat(capping_limit)
          );

          entry.right_carry = parseFloat(businessVolume) - minBusiness;
          entry.left_carry = parseFloat(entry?.left_carry) - minBusiness;
        } else if (
          parseFloat(entry?.left_carry) === 0 &&
          parseFloat(entry?.right_carry) > 0
        ) {
          entry.right_carry =
            parseFloat(businessVolume) + parseFloat(entry?.right_carry);
        } else if (
          parseFloat(entry?.left_carry) === 0 &&
          parseFloat(entry?.right_carry) === 0 &&
          parseFloat(entry?.right_business) - parseFloat(businessVolume) ===
            parseFloat(entry?.left_business) &&
          parseFloat(entry?.left_business) > 0
        ) {
          entry.right_carry =
            parseFloat(businessVolume) + parseFloat(entry?.right_carry);
        } else if (parseFloat(entry?.left_business) > 0) {
          const minBusiness = Math.min(
            parseFloat(businessVolume),
            parseFloat(entry?.left_business)
          );

          const binaryBonus = Math.min(minBusiness * 0.1);
          const updateBinaryBusiness =
            parseFloat(binaryBonus) + parseFloat(entry.binary_due);
          entry.binary_due = updateBinaryBusiness;
          entry.matching_due =
            parseFloat(minBusiness) + parseFloat(entry.matching_due);

          entry.actual_due = Math.min(
            updateBinaryBusiness,
            parseFloat(capping_limit)
          );

          entry.right_carry = parseFloat(businessVolume) - minBusiness;
          entry.left_carry = parseFloat(entry?.left_business) - minBusiness;
        }
      }
      await binaryTreeService.updateBinaryTreeEntry(entry); // Update the binary tree entry with new values
      if (entry.user_id !== "CROWN-000000") {
        await module.exports.checkAndAwardBinaryCareerBonus(
          entry?.user_id,
          req
        );
        console.log("checkAndAwardBinaryCareerBonus done");
      }
      i++;
      // Move up the tree
      userId = entry?.user_id;
    }
  },
  updateBinaryBusiness: async (
    userId,

    businessVolume
  ) => {
    try {
      let entry = await binaryTreeService.getBinaryTreeEntryByUserId(userId);
      if (!entry) return;
      let i = 0;
      while (entry && entry?.parent_id) {
        entry = await binaryTreeService.getBinaryTreeEntryByUserId(
          entry?.parent_id
        );
        position = entry?.left_child === userId ? "left" : "right";
        // console.log(i, entry, position);
        if (position === "left") {
          entry.left_business =
            parseFloat(entry?.left_business) + parseFloat(businessVolume);
        } else if (position === "right") {
          entry.right_business =
            parseFloat(entry?.right_business) + parseFloat(businessVolume);
        }

        await binaryTreeService.updateBinaryTreeEntry(entry); // Update the binary tree entry with new values

        i++;
        // Move up the tree
        userId = entry?.user_id;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  removeBinaryBusinessVolumeAndCalculateBonus: async (
    userId,

    businessVolume
  ) => {
    let entry = await binaryTreeService.getBinaryTreeEntryByUserId(userId);
    if (!entry) return;
    let i = 0;
    const capping_limit = await binaryTreeService.getCappingLimitOfUser(
      entry?.user_id
    );
    entry.capping_limit = parseFloat(capping_limit);
    entry.actual_due = Math.min(
      parseFloat(entry.binary_due),
      parseFloat(capping_limit)
    );
    await binaryTreeService.updateBinaryTreeEntry(entry); // Update the binary tree entry with new values

    while (entry && entry?.parent_id) {
      entry = await binaryTreeService.getBinaryTreeEntryByUserId(
        entry?.parent_id
      );
      position = entry?.left_child === userId ? "left" : "right";
      const capping_limit = await binaryTreeService.getCappingLimitOfUser(
        entry?.user_id
      );
      entry.capping_limit = capping_limit;
      // console.log(i, entry, position);
      if (position === "left") {
        entry.left_business =
          parseFloat(entry?.left_business) + parseFloat(businessVolume);
        if (parseFloat(entry?.right_carry) > 0) {
          const minBusiness = Math.min(
            parseFloat(businessVolume),
            parseFloat(entry?.right_carry)
          );

          entry.left_carry = parseFloat(businessVolume) - minBusiness;
          entry.right_carry = parseFloat(entry?.right_carry) - minBusiness;
        } else if (
          parseFloat(entry?.right_carry) === 0 &&
          parseFloat(entry?.left_carry) > 0
        ) {
          entry.left_carry =
            parseFloat(businessVolume) + parseFloat(entry?.left_carry);
        } else if (parseFloat(entry?.right_business) > 0) {
          const minBusiness = Math.min(
            parseFloat(businessVolume),
            parseFloat(entry?.right_business)
          );

          entry.left_carry = parseFloat(businessVolume) - minBusiness;
          entry.right_carry = parseFloat(entry?.right_business) - minBusiness;
        }
      } else if (position === "right") {
        entry.right_business =
          parseFloat(entry?.right_business) + parseFloat(businessVolume);
        if (parseFloat(entry?.left_carry) > 0) {
          const minBusiness = Math.min(
            parseFloat(businessVolume),
            parseFloat(entry?.left_carry)
          );

          entry.right_carry = parseFloat(businessVolume) - minBusiness;
          entry.left_carry = parseFloat(entry?.left_carry) - minBusiness;
        } else if (
          parseFloat(entry?.left_carry) === 0 &&
          parseFloat(entry?.right_carry) > 0
        ) {
          entry.right_carry =
            parseFloat(businessVolume) + parseFloat(entry?.right_carry);
        } else if (parseFloat(entry?.left_business) > 0) {
          const minBusiness = Math.min(
            parseFloat(businessVolume),
            parseFloat(entry?.left_business)
          );

          entry.right_carry = parseFloat(businessVolume) - minBusiness;
          entry.left_carry = parseFloat(entry?.left_business) - minBusiness;
        }
      }
      await binaryTreeService.updateBinaryTreeEntry(entry); // Update the binary tree entry with new values

      i++;
      // Move up the tree
      userId = entry?.user_id;
    }
  },
  // Fetch the current career level of the user.
  // Check and calculate the required business amount based on the user's current career level.
  // Check if the user's left and right business are greater than or equal to the required amount.
  // If the user qualifies, check if the user already has a reward for that level.
  // If not, insert a reward for the user and update the user's career level.
  checkAndAwardBinaryCareerBonus: async (userId, req) => {
    try {
      // Fetch current binary career level from user_career_levels table
      const {
        currentLevel,
        requiredBusinessVolume,
        reward_amount,
        currentLeftBusiness,
        currentRightBusiness,
        highestLevel,
      } = await careerRewardsService.getUserCareerAndRequiredBusinessVolume(
        userId
      );

      if (
        parseFloat(currentLeftBusiness) >= parseFloat(requiredBusinessVolume) &&
        parseFloat(currentRightBusiness) >=
          parseFloat(requiredBusinessVolume) &&
        parseFloat(highestLevel) > parseFloat(currentLevel)
      ) {
        // Check if the user already received the career reward for this level

        // Loop through all levels between current and highest
        for (let level = currentLevel + 1; level <= highestLevel; level++) {
          // Check if the user already received the career reward for this level
          const existingReward =
            await careerRewardsService.getRewardForAchievement(
              userId,
              `Level ${level} achieved binary tree bonus`
            );

          if (!existingReward) {
            const rewardForLevel =
              await careerRewardsService.getRewardAmountForBinaryLevel(level);
            // Insert the reward
            await careerRewardsService.createCareerReward({
              userId: userId,
              achievement: `Level ${level} achieved binary tree bonus`,
              date: new Date(),
              reward_type: "binary_business",
              reward_id: level, // Use the level as ID
              reward_amount: rewardForLevel?.reward_amount,
            });
            console.log(`award given to ${userId}`);
            await notificationService.createNotification(
              userId,
              "user",
              `Congrats!: You have received $${rewardForLevel?.reward_amount} career level reward!.`,
              "career"
            );
            await sendNotificationToUser(req, userId);

            await notificationService.createNotification(
              null,
              "admin",
              `Career level reward created for ${userId} of $${rewardForLevel?.reward_amount}.`,
              "career"
            );
            await sendNotificationToAdmin(req);
          }
        }
        await careerRewardsService.updateCareerLevelByType({
          userId,
          type: "binary_career_level",
          level: highestLevel,
        });
        await walletService.updateInterestWallet(userId, reward_amount);
      }
    } catch (error) {
      console.error("Error awarding binary career bonus:", error);
      throw error;
    }
  },
};

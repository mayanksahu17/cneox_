const { otpCache } = require("../utils/cache");
const emailService = require("../services/mail_service");
const user_service = require("../services/user_service");
const userService = require("../services/user_service");
const generateRandomCode = require("../utils/code-generator");
const jwt = require("jsonwebtoken");
const pMap = require("p-map");

module.exports = {
  sendEmail: async (req, res, next) => {
    try {
      const { to, subject, message } = req.body;

      // Send email
      await emailService.sendEmail({ to, subject, message });

      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.log("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  uploadCSV: async (req, res) => {
    try {
      const { body, subject, emails } = req.body;
      const variables = { content: body };
      console.log(emails);
      // Iterate through emails and send mail
      await pMap(
        emails,
        async (email) => {
          // Replace {{content}} with the body in the HTML
          console.log(email);
          await emailService.sendBulkEmails({
            to: email,
            subject,
            template: "bulkmail",
            variables: variables,
          });
        },
        { concurrency: 10 }
      );

      return res.status(200).json({
        message: "Email sent successfully",
      });
    } catch (error) {
      console.error("Error sending emails:", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // send OTP
  sendOtp: async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const user = await user_service.getUserById(userId);
      if (!user) {
        return res.status(400).json({
          message: "User ID not found",
          success: false,
        });
      }
      // Check if the OTP request is cached
      const cachedOtp = otpCache.get(userId);
      if (cachedOtp) {
        return res.status(429).json({
          message: "Too many OTP requests. Please wait.",
          success: false,
        });
      }

      const otp = generateRandomCode();
      const template = "newotp";
      // const subject = "Withdrawal Request";
      const variables = {
        userId: userId,
        otp: otp,
      };
      // Store the OTP in cache
      otpCache.set(userId, otp);
      // Send OTP
      await emailService.sendCommonElasticMail({
        to: user?.email,
        template,
        variables,
      });

      return res
        .status(200)
        .json({ success: true, message: "OTP sent successfully", otp: "1234" });
    } catch (error) {
      console.log("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  sendVerifyLink: async (req, res, next) => {
    try {
      const { userId } = req.body;

      const template = "verify";
      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(400).json({
          message: "User ID not found",
          success: false,
        });
      }
      console.log(userId);
      const verificationToken = jwt.sign(
        { id: userId, email: user?.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const variables = {
        userId: `https://crownbankers.com/verify/${verificationToken}`,
      };
      console.log(verificationToken);
      await emailService.sendCommonElasticMail({
        to: user?.email,
        template,
        variables,
      });

      return res.status(200).json({
        success: true,
        message: "Verification link sent successfully",
      });
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  generateVerificationLink: async (req, res, next) => {
    try {
      const { userId } = req.body;

      const template = "verify";
      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(400).json({
          message: "User ID not found",
          success: false,
        });
      }
      console.log(userId);
      const verificationToken = jwt.sign(
        { id: userId, email: user?.email },
        process.env.JWT_SECRET,
        { expiresIn: "365d" }
      );

      return res.status(200).json({
        success: true,
        link: `https://crownbankers.com/verify/${verificationToken}`,
      });
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  sendInvite: async (req, res, next) => {
    try {
      const { to, subject, position, userId } = req.body;
      const link = req.body.link;

      const message = `You are invited to join Ozo Pay. Click on the following link to create your account: ${link}`;

      // Send email
      await emailService.sendEmail({ to, subject, message });
      emailService.createEmailSubmission(userId, to, position);
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.log("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  createEmailSubmission: async (req, res) => {
    try {
      const { userId, email, position } = req.body;

      await emailService.createEmailSubmission(userId, email, position);

      res.status(201).json({
        success: true,
        message: "Email submission created successfully",
      });
    } catch (error) {
      console.error("Error creating email submission:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  getAllEmailSubmissions: async (req, res) => {
    try {
      const emailSubmissions = await emailService.getAllEmailSubmissions();
      res.status(200).json({ data: emailSubmissions, success: true });
    } catch (error) {
      console.error("Error retrieving email submissions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getEmailSubmissionsByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const emailSubmissions =
        await emailService.getAllEmailSubmissionsByUserId(userId);
      res.status(200).json({ data: emailSubmissions, success: true });
    } catch (error) {
      console.error("Error retrieving email submissions:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // New package notification
  sendNewPackageNotification: async (req, res) => {
    try {
      const { date, gateway, package, userId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "newpackage";
      const variables = { date, gateway, package, userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "New Package Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // 2FA Enabled
  send2FANotification: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "2fa";
      const variables = { userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "2FA Enabled Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // 2FA Disabled
  send2FADisabledNotification: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "2fadisabled";
      const variables = { userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "2FA Disabled Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // KYC Approved
  sendKYCApprovedNotification: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "kycapproved";
      const variables = { userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "KYC Approved Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // KYC Rejected
  sendKYCRejectedNotification: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "kycrejected";
      const variables = { userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "KYC Rejected Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Email Updated
  sendEmailChangedNotification: async (req, res) => {
    try {
      const { date, email } = req.body;
      const to = email;
      const template = "emailchanged";
      const variables = { date, email };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Email Updated Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Password Updated
  sendPasswordUpdatedNotification: async (req, res) => {
    try {
      const { userId, email } = req.body;
      const to = email;
      const template = "passwordupdated";
      const variables = { userId, email };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Password Updated Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Transaction Pin Updated
  sendTransactionPinUpdatedNotification: async (req, res) => {
    try {
      const { pin, userId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "securitypinupdated";
      const variables = { pin, userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Transaction Pin Updated Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Partial Payment Received
  sendPartialPaymentNotification: async (req, res) => {
    try {
      const { userId, email } = req.body;
      const to = email;
      const template = "partialpayment";
      const variables = { userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Partial Payment Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Withdrawal Declined
  sendWithdrawalDeclinedNotification: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "withdrawal_declined";
      const variables = { userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Withdrawal Declined Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Withdrawal Successful Notification
  sendWithdrawalSuccessNotification: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "withdrawal_success";
      const variables = { userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Withdrawal Successful Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Reinvestment of Profits Successful Notification
  sendReinvestProfitNotification: async (req, res) => {
    try {
      const { amount, date, package, userId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "reinvest_profit";
      const variables = { amount, date, package, userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message:
          "Reinvestment of Profits Successful Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Ticket Creation Notification
  sendTicketCreationNotification: async (req, res) => {
    try {
      const { date, issue, ticketId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "ticketcreation";
      const variables = { date, issue, ticketId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Ticket Creation Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Ticket Resolved Notification
  sendTicketResolvedNotification: async (req, res) => {
    try {
      const { date, issue, ticketId } = req.body;
      const user = await getUserById(userId);
      const to = user.email;
      const template = "ticketresolved";
      const variables = { date, issue, ticketId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Ticket Resolved Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Invitation Notification
  sendInvitationNotification: async (req, res) => {
    try {
      const { email, position, userId } = req.body;
      const to = email;
      const template = "invitation";
      const variables = { email, position, userId };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Invitation Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  // Associated Accounts Notification
  sendAssociatedAccountsNotification: async (req, res) => {
    try {
      const { email, list } = req.body;
      const to = email;
      const template = "accounts";
      const variables = { email, list };

      await emailService.sendCommonElasticMail({ to, template, variables });
      res.status(200).json({
        success: true,
        message: "Associated Accounts Notification sent successfully",
      });
    } catch (error) {
      console.error("Error: ", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

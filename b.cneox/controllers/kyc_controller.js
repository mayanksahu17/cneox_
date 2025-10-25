const kycService = require("../services/kyc_service");
const { sendCommonElasticMail } = require("../services/mail_service");
const notificationService = require("../services/notifications_service");
const { getUserById } = require("../services/user_service");
const { getUKTime, formatDateToYMD, formatToUKTime } = require("../utils/date");
const {
  sendNotificationToUser,
  sendNotificationToAdmin,
} = require("../utils/notifications");

module.exports = {
  approveOrRejectKYC: async (req, res, next) => {
    try {
      const { ids, status } = req.body;
      console.log(ids, status);
      const results = [];
      if (status !== "approved" && status !== "rejected") {
        return res.status(400).json({ message: "Bad request", success: false });
      }
      for (const id of ids) {
        try {
          // Update the withdrawal status
          await kycService.updateKYCStatus({
            id,
            status,
            updated_date: getUKTime(),
          });
          const kyc = await kycService.getKYCById(id);

          await notificationService.createNotification(
            kyc.user_id,
            "user",
            `KYC status changed to ${status}.`,
            "kyc"
          );
          await sendNotificationToUser(req, kyc.user_id);
          const user = await getUserById(kyc.user_id);
          if (status === "approved") {
            const to = user.email;
            const template = "kycapproved";
            const variables = { userId: kyc.user_id };

            await sendCommonElasticMail({ to, template, variables });
          } else {
            const to = user.email;
            const template = "kycrejected";
            const variables = { userId: kyc.user_id };

            await emailService.sendCommonElasticMail({
              to,
              template,
              variables,
            });
          }

          results.push({ id, success: true });
        } catch (error) {
          console.error("Error:", error);
          results.push({
            id,
            success: false,
            message: "Internal Server Error",
          });
        }
      }

      return res.status(200).json({ data: results, success: true });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Something went wrong", success: false });
    }
  },
  create: async (req, res) => {
    try {
      const { userId, doctype, doclink, status } = req.body;
      const kycId = await kycService.createKYC(
        userId,
        doctype,
        doclink,
        status
      );
      await notificationService.createNotification(
        null,
        "admin",
        `New KYC uploaded by ${userId}.`,
        "kyc"
      );
      await sendNotificationToAdmin(req);
      res.status(201).json({ kycId, success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  read: async (req, res) => {
    try {
      const { userId } = req.params;
      const kycData = await kycService.getKYC(userId);
      res.status(200).json({ data: kycData, success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  update: async (req, res) => {
    try {
      const { userId, doctype, doclink, status, id } = req.body;
      const updated_date = getUKTime();
      await kycService.updateKYC(
        userId,
        doctype,
        doclink,
        status,
        id,
        updated_date
      );
      res.status(200).json({ message: "KYC updated", success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  delete: async (req, res) => {
    try {
      const { userId } = req.params;
      await kycService.deleteKYC(userId);
      res.status(200).json({ message: "KYC deleted", success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getPending: async (req, res) => {
    try {
      const data = await kycService.getAllPendingKYC();
      res.status(200).json({ message: "Sucess", success: true, data: data });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = await kycService.getAllKYC();
      res.status(200).json({ message: "Success", success: true, data: data });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllReport: async (req, res) => {
    try {
      const data = await kycService.getAllReport();
      res.status(200).json({ data: data, success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllForexChartReport: async (req, res) => {
    try {
      const data = await kycService.getAllForexChartReport();
      res.status(200).json({ data: data, success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  addQuery: async (req, res) => {
    try {
      req.body.inquiry_date = formatToUKTime();
      const result = await kycService.createQuery(req.body);
      res.status(201).json({ success: true, queryId: result });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  getQueries: async (req, res) => {
    try {
      const queries = await kycService.getAllQueries();
      res.status(200).json({ success: true, data: queries });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
};

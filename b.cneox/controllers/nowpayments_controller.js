const walletService = require("../services/wallets_service");
const voucherService = require("../services/voucher_service");

const nowpayment_service = require("../services/nowpayments_service");

const invetsments_service = require("../services/invetsments_service");
const { createInvestment } = require("./investments_controller");
const user_service = require("../services/user_service");
const packages_master_service = require("../services/packages_master_service");
const voucher_service = require("../services/voucher_service");
const notificationService = require("../services/notifications_service");
const {
  sendNotificationToUser,
  sendNotificationToAdmin,
} = require("../utils/notifications");
const { sendCommonElasticMail } = require("../services/mail_service");
const { generateString } = require("../utils/string-generator");
const { getUKTime } = require("../utils/date");
function convertUnixTimestampToHumanReadable(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  return date.toLocaleString("en-GB", { timeZone: "Europe/London" }); // Convert to UK date-time string
}
const merchantId = "Your_Merchant_ID";
const ipnSecret = "Your_IPN_Secret";
module.exports = {
  createTransaction: async (req, res, next) => {
    const { amount, buyer_email, custom } = req.body;
    const requiredFields = [
      { name: "amount", message: "Missing amount field" },
      { name: "buyer_email", message: "Missing buyer_email field" },
      { name: "custom", message: "Missing custom field" },
    ];

    for (const field of requiredFields) {
      if (!req.body[field.name] || req.body[field.name] === "") {
        return res.status(400).json({ success: false, message: field.message });
      }
    }

    try {
      const customArray = eval(custom);
      const nowPaymentData = [];
      nowPaymentData.user_id = customArray[0];
      nowPaymentData.type = customArray[1];
      nowPaymentData.sponsor = customArray[2];
      nowPaymentData.package_id = customArray[3];
      nowPaymentData.invested_amount = customArray[4];
      nowPaymentData.deposit_amount = customArray[5];
      nowPaymentData.voucher_amount = customArray[6];
      nowPaymentData.voucher_id = customArray[7];
      const order_id = "OI-".concat(generateString(12)) + new Date().getTime();
      //check all amounts
      if (
        !parseFloat(nowPaymentData.invested_amount) ||
        parseFloat(amount) !== parseFloat(nowPaymentData.deposit_amount) ||
        parseFloat(nowPaymentData.deposit_amount) < 0 ||
        parseFloat(nowPaymentData.voucher_amount) < 0 ||
        parseFloat(nowPaymentData.invested_amount) < 0 ||
        parseFloat(nowPaymentData.invested_amount) !==
          parseFloat(nowPaymentData.deposit_amount) +
            parseFloat(nowPaymentData.voucher_amount) ||
        !["self", "downline"].includes(nowPaymentData.type) ||
        (nowPaymentData.voucher_id !== "NA" &&
          parseFloat(nowPaymentData.deposit_amount) !==
            parseFloat(nowPaymentData.voucher_amount)) ||
        (nowPaymentData.voucher_id === "NA" &&
          parseFloat(nowPaymentData.voucher_amount) > 0)
      ) {
        console.log("main h invalid de raha");
        return res.status(400).json({
          success: false,
          message: "Invalid data",
        });
      }
      //check type and users existance
      const userCreds = await user_service.getUserById(nowPaymentData.user_id);
      if (!userCreds) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }

      if (nowPaymentData?.type === "downline") {
        const downlineCreds = await user_service.getUserById(
          nowPaymentData.sponsor
        );
        if (!downlineCreds) {
          return res.status(400).json({
            success: false,
            message: "Invalid userId or you are a new user",
          });
        }
      }
      const packageData = await packages_master_service.getPackageById(
        nowPaymentData?.package_id
      );
      if (
        parseFloat(nowPaymentData?.invested_amount) <
          parseFloat(packageData?.min_amount) ||
        parseFloat(nowPaymentData?.invested_amount) >
          parseFloat(packageData?.max_amount)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid package details",
        });
      }
      if (
        nowPaymentData.voucher_id !== "NA" &&
        parseFloat(nowPaymentData.voucher_amount) > 0
      ) {
        //check voucher id and its existance
        const voucher = await voucherService.getVoucherByVoucherId(
          nowPaymentData?.voucher_id
        );
        if (nowPaymentData?.type === "downline") {
          if (voucher?.userId != nowPaymentData?.sponsor) {
            return res.status(400).json({
              success: false,
              message: "Invalid voucher",
            });
          }
        } else {
          if (voucher?.userId != nowPaymentData?.user_id) {
            return res.status(400).json({
              success: false,
              message: "Invalid voucher",
            });
          }
        }
        if (
          !voucher ||
          voucher?.status != "active" ||
          parseFloat(voucher?.amount) <
            parseFloat(nowPaymentData?.voucher_amount)
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid voucher",
          });
        }
      }
      const [paymentData, success] = await nowpayment_service.createTransaction(
        {
          price_currency: "USD",
          price_amount: nowPaymentData.deposit_amount,
          order_id,
          order_description: "investment",
          customer_email: buyer_email,
        }
      );
      console.log(paymentData);

      nowPaymentData.amount1 = amount;

      nowPaymentData.currency1 = "USD";

      nowPaymentData.custom = custom;
      nowPaymentData.email = buyer_email;

      nowPaymentData.received_amount = 0;
      nowPaymentData.status_text = "waiting ";

      nowPaymentData.txn_id = paymentData?.id;
      nowPaymentData.checkout_url = paymentData?.invoice_url;
      nowPaymentData.order_id = paymentData?.order_id;

      await nowpayment_service.saveTransaction(nowPaymentData);

      if (success) {
        res.status(200).json({ data: paymentData, success: true });
      } else {
        res.status(400).json({ success: false, message: "Failed" });
      }
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAllTransactions: async (req, res) => {
    try {
      const transactions = await nowpayment_service.getAllTransactions();
      res.status(200).json({ data: transactions, success: true });
    } catch (error) {
      console.log("Error: ", error.sqlMessage);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getDepositData: async (req, res, next) => {
    // const hmacHeader = req.get("HMAC");

    // if (!hmacHeader) {
    //   return res.status(400).send("No HMAC signature sent");
    // }

    // const merchant = req.body.merchant || "";

    // if (!merchant) {
    //   return res.status(400).send("No Merchant ID passed");
    // }

    // if (merchant !== merchantId) {
    //   return res.status(403).send("Invalid Merchant ID");
    // }

    // const requestPayload = JSON.stringify(req.body);

    // const hmac = crypto
    //   .createHmac("sha512", ipnSecret)
    //   .update(requestPayload)
    //   .digest("hex");

    // if (hmac !== hmacHeader) {
    //   return res.status(403).send("HMAC signature does not match");
    // }
    console.log(req.body);
    const txn = await nowpayment_service.getTransactionByTxnId(
      req.body.invoice_id
    );
    if (!txn) {
      return res.status(400).json({ message: "Bad request", success: false });
    }

    console.log("printing existing txn", txn);
    if (txn?.status_text === "finished") {
      return res
        .status(200)
        .json({ message: "Already updated", success: false });
    }

    if (req.body?.payment_status === "partially_paid") {
      console.log("inside partial check");

      const variables = {
        amount: req.body?.actually_paid,
      };
      await notificationService.createNotification(
        null,
        "admin",
        `Partial payment received!.`,
        "nowpayment"
      );
      await sendNotificationToAdmin(req);
      await sendCommonElasticMail({
        to: "technovativefarms@gmail.com",
        template: "partial",
        variables,
      });
    }
    await nowpayment_service.updateTransaction(req.body);

    if (req.body.payment_status === "finished") {
      try {
        const customArray = eval(txn.custom);
        const txn_id = req.body.invoice_id;
        const user_id = customArray[0];
        const type = customArray[1];
        const sponsor = customArray[2];
        const package_id = customArray[3];
        const invested_amount = customArray[4];
        const deposit_amount = customArray[5];
        const voucher_amount = customArray[6];
        const voucher_id = customArray[7];
        const crypto_type = req.body.pay_currency;

        // Check if the deposit with the given txn_id exists and has a completed status
        const existingDeposit = await invetsments_service.getInvestmentByTxnId(
          txn_id
        );
        if (existingDeposit) {
          console.log("deposit exists");
          // If the deposit already exists and has a completed status, return 200 OK
          res
            .status(200)
            .json({ message: "Investment already exists", success: true });
          return;
        }
        if (crypto_type === "LTCT") {
          return res.status(400).json({
            success: false,
            message: "Invalid userId or you are a new user",
          });
        }
        //first check user exsits and wallet amount is sufficient
        const userWallet = await user_service.getUserAndWalletData({
          userId: user_id,
        });
        if (!userWallet) {
          return res.status(400).json({
            success: false,
            message: "Invalid userId or you are a new user",
          });
        } // all valid data
        if (type === "downline") {
          const downlineCreds = await user_service.getUserById(sponsor);
          if (!downlineCreds) {
            return res.status(400).json({
              success: false,
              message: "Invalid userId or you are a new user",
            });
          }
        }
        if (
          !parseFloat(invested_amount) ||
          parseFloat(deposit_amount) < 0 ||
          parseFloat(voucher_amount) < 0 ||
          parseFloat(invested_amount) < 0 ||
          parseFloat(invested_amount) !==
            parseFloat(deposit_amount) + parseFloat(voucher_amount) ||
          !["self", "downline"].includes(type) ||
          (voucher_id !== "NA" &&
            parseFloat(invested_amount) !== parseFloat(voucher_amount) * 2) ||
          (voucher_id === "NA" && parseFloat(voucher_amount) > 0)
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid data",
          });
        }

        const packageData = await packages_master_service.getPackageById(
          package_id
        );
        if (
          parseFloat(invested_amount) < parseFloat(packageData?.min_amount) ||
          parseFloat(invested_amount) > parseFloat(packageData?.max_amount)
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid package details",
          });
        }
        let voucher;
        let newAmount;
        let newStatus;
        if (voucher_id !== "NA" && parseFloat(voucher_amount) > 0) {
          voucher = await voucher_service.getVoucherByVoucherId(voucher_id);
          if (type === "downline") {
            if (voucher?.userId != sponsor) {
              return res.status(400).json({
                success: false,
                message: "Invalid voucher",
              });
            }
          } else {
            if (voucher?.userId != user_id) {
              return res.status(400).json({
                success: false,
                message: "Invalid voucher",
              });
            }
          }
          if (
            !voucher ||
            voucher?.status != "active" ||
            parseFloat(voucher?.amount) < parseFloat(voucher_amount)
          ) {
            console.log(voucher);
            return res.status(400).json({
              success: false,
              message: "Invalid data",
            });
          } else {
            newAmount =
              parseFloat(voucher?.amount) - parseFloat(voucher_amount);
            if (newAmount === 0) {
              newStatus = "used";
            } else {
              newStatus = "active";
            }
          }
        }
        // const deposit = await createInvestment({
        //   user_id,
        //   sponsor,
        //   package_id,
        //   invested_amount,
        //   deposit_amount,
        //   token_amount: voucher_amount,
        //   email: userWallet?.email,
        //   txn_id,
        //   crypto_type,
        //   type,
        //   voucher_id,
        //   req,
        //   res,
        //   newAmount,
        //   newStatus,
        //   req,
        // });
        const investment_date = getUKTime();
        const expires_on = investment_date;
        const token_amount = voucher_amount;
        const deposit = await invetsments_service.createInvestment(
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
        console.log("investment created");
        if (type === "self") {
          await walletService.updateTotalDeposit(user_id, invested_amount);
        } else {
          await walletService.updateTotalDeposit(sponsor, invested_amount);
          await notificationService.createNotification(
            sponsor,
            "user",
            `Downline investment successful for $${user_id} : $${invested_amount}.`,
            "investment"
          );
          await sendNotificationToUser(req, sponsor);
        }
        await notificationService.createNotification(
          user_id,
          "user",
          `Investment successful : $${invested_amount}.`,
          "investment"
        );
        await sendNotificationToUser(req, user_id);

        await notificationService.createNotification(
          null,
          "admin",
          `Investment created for ${user_id} of $${invested_amount}.`,
          "investment"
        );
        await sendNotificationToAdmin(req);
        return res.status(201).json({ data: deposit, success: true });
      } catch (error) {
        console.error("Error creating investment:", error);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      }
    } else {
      console.log("just updating");
      return res.status(200).json({ message: "Entry Updated", success: false });
    }
  },

  getTransactionInfo: async (req, res, next) => {
    try {
      const { transactionId } = req.body;

      const paymentData = await nowpayment_service.getTransactionInfo(
        transactionId
      );

      console.log(paymentData);
      res.status(400).json({ success: true, data: paymentData });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

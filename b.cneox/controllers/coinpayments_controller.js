const paymentService = require("../services/coinpayment_service");
const crypto = require("crypto");
const walletService = require("../services/wallets_service");
const voucherService = require("../services/voucher_service");

const coinpayment_service = require("../services/coinpayment_service");

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
function convertUnixTimestampToHumanReadable(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  return date.toLocaleString("en-GB", { timeZone: "Europe/London" }); // Convert to UK date-time string
}
const merchantId = "Your_Merchant_ID";
const ipnSecret = "Your_IPN_Secret";
module.exports = {
  getBasicAccountInfo: async (req, res, next) => {
    try {
      const response = await paymentService.getBasicAccountInfo();

      if (response) {
        res.status(200).json({ data: response, success: true });
      } else {
        res.status(400).json({ success: true, message: "Error getting info" });
      }
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getDepositAddress: async (req, res, next) => {
    const { currency } = req.params;
    console.log(currency);

    try {
      const response = await paymentService.getDepositAddress(currency);
      // console.log(response);
      if (response) {
        res.status(200).json({ data: response, success: true });
      } else {
        res.status(400).json({ success: true, message: "Error getting info" });
      }
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  createTransaction: async (req, res, next) => {
    const { to_currency, amount, buyer_email, buyer_name, custom } = req.body;
    const requiredFields = [
      { name: "to_currency", message: "Missing to_currency field" },
      { name: "amount", message: "Missing amount field" },
      { name: "buyer_email", message: "Missing buyer_email field" },
      { name: "buyer_name", message: "Missing buyer_name field" },
      { name: "custom", message: "Missing custom field" },
    ];
    console.log("here");
    for (const field of requiredFields) {
      if (!req.body[field.name] || req.body[field.name] === "") {
        return res.status(400).json({ success: false, message: field.message });
      }
    }

    try {
      const customArray = eval(custom);
      const coinPaymentData = [];
      coinPaymentData.user_id = customArray[0];
      coinPaymentData.type = customArray[1];
      coinPaymentData.sponsor = customArray[2];
      coinPaymentData.package_id = customArray[3];
      coinPaymentData.invested_amount = customArray[4];
      coinPaymentData.deposit_amount = customArray[5];
      coinPaymentData.voucher_amount = customArray[6];
      coinPaymentData.voucher_id = customArray[7];

      console.log(coinPaymentData, customArray);
      console.log(
        !parseFloat(coinPaymentData.invested_amount),
        parseFloat(amount) !== parseFloat(coinPaymentData.deposit_amount),
        parseFloat(coinPaymentData.deposit_amount) < 0,
        parseFloat(coinPaymentData.voucher_amount) < 0,
        parseFloat(coinPaymentData.invested_amount) < 0,
        parseFloat(coinPaymentData.invested_amount) !==
          parseFloat(coinPaymentData.deposit_amount) +
            parseFloat(coinPaymentData.voucher_amount),
        !["self", "downline"].includes(coinPaymentData.type),
        coinPaymentData.voucher_id !== "NA" &&
          parseFloat(coinPaymentData.invested_amount) !==
            parseFloat(coinPaymentData.voucher_amount) * 2,
        coinPaymentData.voucher_id === "NA" &&
          parseFloat(coinPaymentData.voucher_amount) > 0
      );
      //check all amounts
      if (
        !parseFloat(coinPaymentData.invested_amount) ||
        parseFloat(amount) !== parseFloat(coinPaymentData.deposit_amount) ||
        parseFloat(coinPaymentData.deposit_amount) < 0 ||
        parseFloat(coinPaymentData.voucher_amount) < 0 ||
        parseFloat(coinPaymentData.invested_amount) < 0 ||
        parseFloat(coinPaymentData.invested_amount) !==
          parseFloat(coinPaymentData.deposit_amount) +
            parseFloat(coinPaymentData.voucher_amount) ||
        !["self", "downline"].includes(coinPaymentData.type) ||
        (coinPaymentData.voucher_id !== "NA" &&
          parseFloat(coinPaymentData.deposit_amount) !==
            parseFloat(coinPaymentData.voucher_amount) &&
          parseFloat(coinPaymentData.voucher_amount) < 12.5) ||
        (coinPaymentData.voucher_id === "NA" &&
          parseFloat(coinPaymentData.voucher_amount) > 0) ||
        (coinPaymentData.voucher_id === "NA" &&
          parseFloat(coinPaymentData.deposit_amount) < 10)
      ) {
        console.log("main h invalid de raha");
        return res.status(400).json({
          success: false,
          message: "Invalid data",
        });
      }
      //check type and users existance
      const userCreds = await user_service.getUserById(coinPaymentData.user_id);
      if (!userCreds) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      if (to_currency === "LTCT") {
        return res.status(400).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      if (coinPaymentData?.type === "downline") {
        const downlineCreds = await user_service.getUserById(
          coinPaymentData.sponsor
        );
        if (!downlineCreds) {
          return res.status(400).json({
            success: false,
            message: "Invalid userId or you are a new user",
          });
        }
      }
      const packageData = await packages_master_service.getPackageById(
        coinPaymentData?.package_id
      );
      if (
        parseFloat(coinPaymentData?.invested_amount) <
          parseFloat(packageData?.min_amount) ||
        parseFloat(coinPaymentData?.invested_amount) >
          parseFloat(packageData?.max_amount)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid package details",
        });
      }
      if (
        coinPaymentData.voucher_id !== "NA" &&
        parseFloat(coinPaymentData.voucher_amount) > 0
      ) {
        //check voucher id and its existance
        const voucher = await voucherService.getVoucherByVoucherId(
          coinPaymentData?.voucher_id
        );
        if (coinPaymentData?.type === "downline") {
          if (voucher?.userId != coinPaymentData?.sponsor) {
            return res.status(400).json({
              success: false,
              message: "Invalid voucher",
            });
          }
        } else {
          if (voucher?.userId != coinPaymentData?.user_id) {
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
            parseFloat(coinPaymentData?.voucher_amount)
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid voucher",
          });
        }
      }
      const [paymentData, success] = await paymentService.createTransaction({
        from_currency: "USD",
        to_currency,
        amount: coinPaymentData.deposit_amount,
        custom,
        buyer_email,
        buyer_name,
      });
      const txnData = await paymentService.getTransactionInfo(
        paymentData?.txn_id
      );
      txnData.time_created = convertUnixTimestampToHumanReadable(
        txnData.time_created
      );

      coinPaymentData.amount1 = txnData?.checkout?.amountf;
      coinPaymentData.amount2 = txnData?.amountf;
      coinPaymentData.buyer_name = buyer_email;
      coinPaymentData.currency1 = txnData?.checkout?.currency;
      coinPaymentData.currency2 = txnData?.coin;
      coinPaymentData.custom = txnData?.checkout?.custom;
      coinPaymentData.email = buyer_email;

      coinPaymentData.merchant = "d75072eff6e5366e969d133f2d927d1b";
      coinPaymentData.received_amount = txnData?.receivedf;
      coinPaymentData.received_confirms = txnData?.recv_confirms;
      coinPaymentData.status = txnData?.status;
      coinPaymentData.status_text = txnData?.status_text;
      coinPaymentData.txn_id = paymentData?.txn_id;
      coinPaymentData.checkout_url = paymentData?.checkout_url;

      await coinpayment_service.saveTransaction(coinPaymentData);
      // await notificationService.createNotification(
      //   null,
      //   "admin",
      //   `${userId} has initiated $${amount} deposit throuh coinpayment`,
      //   "deposit"
      // );
      // await sendNotificationToAdmin(req);
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
      const transactions = await coinpayment_service.getAllTransactions();
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
    const txn = await paymentService.getTransactionByTxnId(req.body.txn_id);
    if (!txn) {
      return res.status(400).json({ message: "Bad request", success: false });
    }

    console.log("printing existing txn", txn);
    if (txn?.status_text === "Complete") {
      return res
        .status(200)
        .json({ message: "Already updated", success: false });
    }

    if (req.body?.status_text !== "Complete" || req.body?.status !== -1) {
      console.log("inside partial check");
      const txnData = await coinpayment_service.getTransactionInfo(
        req.body.txn_id
      );
      if (
        parseFloat(txnData?.amountf) > parseFloat(txnData?.receivedf) &&
        parseFloat(txnData?.receivedf) !== 0
      ) {
        console.log(
          "received amount is less",
          parseFloat(txnData?.amountf),
          parseFloat(txnData?.receivedf)
        );
        req.body.status_text = "Partial payment received";
        req.body.received_amount = txnData?.receivedf;
        const variables = {
          amount: txnData?.receivedf,
        };
        await notificationService.createNotification(
          null,
          "admin",
          `Partial payment received!.`,
          "coinpayment"
        );
        await sendNotificationToAdmin(req);
        await sendCommonElasticMail({
          to: "technovativefarms@gmail.com",
          template: "partial",
          variables,
        });
      }
    }
    await coinpayment_service.updateTransaction(req.body);

    if (req.body.status_text === "Complete") {
      try {
        const customArray = eval(req.body.custom);
        const txn_id = req.body.txn_id;
        const amount = req.body.amount1;
        const user_id = customArray[0];
        const type = customArray[1];
        const sponsor = customArray[2];
        const package_id = customArray[3];
        const invested_amount = customArray[4];
        const deposit_amount = customArray[5];
        const voucher_amount = customArray[6];
        const voucher_id = customArray[7];
        const crypto_type = req.body.currency2;

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
        const deposit = await createInvestment({
          user_id,
          sponsor,
          package_id,
          invested_amount,
          deposit_amount,
          token_amount: voucher_amount,
          email: req.body.email,
          txn_id,
          crypto_type,
          type,
          voucher_id,
          req,
          res,
          newAmount,
          newStatus,
          req,
        });
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

      const paymentData = await paymentService.getTransactionInfo(
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

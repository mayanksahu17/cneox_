const bitiumService = require("../services/bitium_service");
const walletService = require("../services/wallets_service");

module.exports = {
  addTransaction: async (req, res) => {
    const { cryptoCode, name, amountInUSD, userId } = req.body;

    try {
      const generatedAddress = await bitiumService.createAddress({
        cryptoCode,
        name,
      });

      const bitiumTransactionForId = await bitiumService.addTransaction({
        cryptoCode,
        address: generatedAddress,
        amountInUSD,
        userId,
      });

      const bitiumTransactionForDate = await bitiumService.getTransactionById({
        transactionId: bitiumTransactionForId?.insertId,
      });

      res.status(201).json({
        status: "success",
        message: "Transaction created successfully!",
        data: {
          address: generatedAddress,
          createdAt: bitiumTransactionForDate?.createdAt,
        },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  validateTransaction: async (req, res) => {
    console.log("in validateTransaction");
    const io = req.app.get("io");
    const {
      address,
      amountInUsd,
      amount,
      status,
      walletId,
      bitiumId,
      from,
      txId,
      coin,
    } = req.body;

    try {
      const depositTransaction = await bitiumService.getUserByAddress({
        address,
      });

      const isValidBitiumTransaction = await bitiumService.validateBitiumId({
        bitiumId,
      });

      if (
        depositTransaction?.tx_id === txId ||
        depositTransaction?.bitium_id === bitiumId
      ) {
        return res.status(401).json({
          status: "fail",
          message: "Unauthorized transaction",
        });
      }

      if (!isValidBitiumTransaction) {
        return res.status(401).json({
          status: "fail",
          message: "Unauthorized transaction",
        });
      }

      if (!depositTransaction?.userId) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      await bitiumService.validateTransaction({
        amount,
        walletId,
        bitiumId,
        from,
        txId,
        status,
        address,
        amountInUSD: amountInUsd,
      });

      const existingDeposit = await depositTxnService.getDepositByTxnId(txId);
      if (existingDeposit && existingDeposit.status === "completed") {
        return res
          .status(200)
          .json({ status: "fail", message: "Deposit already exists" });
      }

      if (Number(status) === 1) {
        const nowDate = new Date().toISOString();
        await depositTxnService.createDeposit(
          txId,
          depositTransaction?.userId,
          nowDate,
          amountInUsd,
          0,
          coin.toUpperCase(),
          "completed"
        );

        await walletService.updateTotalDeposit(
          depositTransaction?.userId,
          amountInUsd
        );

        io.emit("newBitiumTransaction", {
          address,
          amountInUsd,
          userId: depositTransaction?.userId,
        });
      }

      res.status(201).json({
        status: "success",
        message: "Deposit created successfully!",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getAllBitiumTransaction: async (req, res) => {
    try {
      const results = await bitiumService.getAllBitiumTransaction();
      res.send(results);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  updateCheckoutUrl: async (req, res) => {
    const { address, newCheckoutUrl } = req.body;

    try {
      await bitiumService.updateCheckoutUrl({
        address,
        newCheckoutUrl,
      });

      res.status(200).json({
        status: "success",
        message: "Checkout URL updated successfully!",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

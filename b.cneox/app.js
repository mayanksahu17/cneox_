const express = require("express");
const app = express();
const moment = require("moment-timezone");
const ukTimeZone = "Europe/London";
const cron = require("node-cron");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const geoip = require('geoip-lite');
const XLSX = require("xlsx");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
app.use(express.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/output", express.static(path.join(__dirname, "output")));
app.use(cors());



// Routes

const userRoutes = require("./routes/user_route");
const authRoutes = require("./routes/auth_route");
const mailRoutes = require("./routes/mail_route");
const uploadRoutes = require("./routes/file_upload_route");
const walletRoutes = require("./routes/wallets_route");
const ticketRoutes = require("./routes/tickets_route");
const voucherRoutes = require("./routes/voucher_route");
const paymentRoutes = require("./routes/coinpayment_route");
const nowPaymentRoutes = require("./routes/nowpayments_route.js");
const referralRoutes = require("./routes/referral_route");
const roiTransactionRoutes = require("./routes/roi_wallet_route");
const investmentRoutes = require("./routes/investments_route");
const binaryTransactionRoutes = require("./routes/binary_transaction_route");
const referralTransactionRoutes = require("./routes/referral_transactions_route");
const careerRewardsRoutes = require("./routes/career_rewards_route");
const withdrawalRoutes = require("./routes/withdrawal_route");
const packageRoute = require("./routes/packages_master_route");
const adminRoute = require("./routes/admin_route");
const fundsRoute = require("./routes/funds_managemnet_route");
const powerlegRoute = require("./routes/powerleg_route");
const freeAccountRoute = require("./routes/free_accounts_route.js");
const kycRoute = require("./routes/kyc_route");
const bitiumRoute = require("./routes/bitium_route.js");
const notificationsRoute = require("./routes/notifications_route.js");
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoute);
app.use("/api/email", mailRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/nowpayment", nowPaymentRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/roi-transactions", roiTransactionRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/binary-transactions", binaryTransactionRoutes);
app.use("/api/referral-transactions", referralTransactionRoutes);
app.use("/api/voucher", voucherRoutes);
app.use("/api/career-rewards", careerRewardsRoutes);
app.use("/api/withdrawal", withdrawalRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/funds", fundsRoute);
app.use("/api/powerleg", powerlegRoute);
app.use("/api/notifications", notificationsRoute);
app.use("/api/free-account", freeAccountRoute);
app.use("/api/kyc", kycRoute);

// app.use("/api/bitium", bitiumRoute);
app.use("/public", express.static("public"));








//Scheduler
const roiService = require("./services/roi_transactions_service");
const { processBinaryTransactions   } = require("./services/binary_tree_service");
// app.get("/api/runcron", async(req, res) => {
//   console.log("ROI Scheduler started.");
//   await roiService.processROITransactions();
//       console.log("ROI executed successfully.");
//   res.status(200).json({ message: "Cron job executed successfully." });

// })
// ROI - MON-FRI 12 AM
const roiTask = cron.schedule(
  // "*/2 * * * *",
  "0 0 * * 1-5", // Runs every day at midnight from Monday to Friday
  async () => {
    console.log("ROI Scheduler started.");
    const currentTime = moment().tz(ukTimeZone);
    console.log(
      "Current time in UK:",
      currentTime.format("YYYY-MM-DD HH:mm:ss")
    );
    await roiService.processROITransactions();
    // Fetch investments from yesterday 12 PM to today's 12 PM
    const startOfTimeRange = moment()
      .subtract(1, "days")
      .startOf("day")
      .add(12, "hours")
      .format("YYYY-MM-DD HH:mm:ss");
    const endOfTimeRange = moment()
      .startOf("day")
      .add(12, "hours")
      .format("YYYY-MM-DD HH:mm:ss");
    console.log(startOfTimeRange, endOfTimeRange);
  },
  {
    scheduled: true,
    timezone: ukTimeZone,
  }
);

// BINARY - Every day at 1 AM
const binaryTask = cron.schedule(
  "0 1 * * *", // Runs every day at 1 AM
  // "*/1 * * * *",

  async () => {
    console.log("Binary Scheduler started.");
    await processBinaryTransactions();
  },
  {
    scheduled: true,
    timezone: ukTimeZone,
  }
);
const monthlyTask = cron.schedule(
  "0 1 1 * *", // Runs at 1 AM on the first of each month
  async () => {
    console.log("Binary Scheduler started.");
    await processMonthlyCareerIncome();
  },
  {
    scheduled: true,
    timezone: ukTimeZone,
  }
);

monthlyTask.start();
// Start the schedulers
roiTask.start();
binaryTask.start();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origins: [
      "http://192.25.14.35",
      "http://localhost:5173",
      "https://www.crownbankers.com/",
      "https://admin.crownbankers.com",
      "192.25.14.35",
      "https://alchemypayinsurance.com"
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  // Log the number of sockets connected
  console.log(`Total Sockets Connected: ${io.sockets.sockets.size}`);
  // Listen for userId event and associate it with the socket
  socket.on("userId", (userId) => {
    console.log(userId, socket?.id);
    socket.userId = userId;
  });
  // Listen for userId event and associate it with the socket
  socket.on("admin", ({ userType }) => {
    socket.userType = userType; // Set the userType property on the socket
  });
});

app.set("io", io);
app.use(cors());

module.exports = { server, io };

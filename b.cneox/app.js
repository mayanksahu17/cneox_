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






// Add new entry to data.xlsx
app.post("/api/add-entry", async (req, res) => {
  const { name, email, insuranceNumber, address, number } = req.body;

  try {
    const filePath = path.join(__dirname, "data.xlsx");

    // Load or create workbook
    let workbook, worksheet;
    if (fs.existsSync(filePath)) {
      workbook = XLSX.readFile(filePath);
      worksheet = workbook.Sheets["Sheet1"];
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.aoa_to_sheet([["Name", "Email", "InsuranceNumber", "Address", "Number"]]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    }

    const data = XLSX.utils.sheet_to_json(worksheet);

    // Check for duplicate insurance number
    const exists = data.find(d => d.InsuranceNumber === insuranceNumber);
    if (exists) {
      return res.status(409).json({ error: "Entry with this Insurance Number already exists." });
    }

    // Append new row
    data.push({ Name: name, Email: email, InsuranceNumber: insuranceNumber, Address: address, Number: number });
    const newSheet = XLSX.utils.json_to_sheet(data, { header: ["Name", "Email", "InsuranceNumber", "Address", "Number"] });
    workbook.Sheets["Sheet1"] = newSheet;
    XLSX.writeFile(workbook, filePath);

    res.status(200).json({ message: "Entry added successfully." });
  } catch (err) {
    console.error("Error adding entry:", err);
    res.status(500).json({ error: "Failed to add entry." });
  }
});

app.post("/api/generate-certificate", async (req, res) => {
  const { insuranceNumber } = req.body;
  const stepLogs = [];

  try {
    stepLogs.push("✅ Request received.");

    if (!insuranceNumber) {
      stepLogs.push("❌ Insurance number missing.");
      return res.status(400).json({ error: "Insurance number is required.", logs: stepLogs });
    }

    stepLogs.push("🔍 Insurance number provided: " + insuranceNumber);

    const filePath = path.join(__dirname, "data.xlsx");
    if (!fs.existsSync(filePath)) {
      stepLogs.push("❌ Excel file not found.");
      return res.status(404).json({ error: "Data sheet not found.", logs: stepLogs });
    }

    stepLogs.push("📄 Excel file located, reading contents...");
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets["Sheet1"];
    const data = XLSX.utils.sheet_to_json(worksheet);

    stepLogs.push("📊 Excel data parsed. Searching for matching record...");
    const match = data.find(entry => entry.InsuranceNumber === insuranceNumber);

    if (!match) {
      stepLogs.push("❌ No matching insurance number found.");
      return res.status(403).json({ error: "No matching insurance record found.", logs: stepLogs });
    }

    const { Name: name, Email: email, Address: address, Number: number } = match;
    stepLogs.push(`✅ Record found for: ${name}`);

    // Load and modify PDF
    const templatePath = path.join(__dirname, "certificate_template.pdf");
    if (!fs.existsSync(templatePath)) {
      stepLogs.push("❌ PDF template not found.");
      return res.status(500).json({ error: "PDF template missing.", logs: stepLogs });
    }

    stepLogs.push("📄 PDF template found. Loading...");
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    if (!pages.length) {
      stepLogs.push("❌ PDF has no pages.");
      return res.status(500).json({ error: "PDF template is empty.", logs: stepLogs });
    }

    const lastPage = pages[pages.length - 1];
    stepLogs.push("🖋️ Drawing user info on the certificate...");


    // calculate the coverage period for one year from now so it will valid for one year from issue date
    const today = new Date();
    const yearFromNow = new Date(today.setFullYear(today.getFullYear() + 1));
    const month = yearFromNow.toLocaleString("default", { month: "long" });
    const year = yearFromNow.getFullYear();
    const day = yearFromNow.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = yearFromNow.getMonth();
    const monthName = monthNames[monthIndex];
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
    const dayWithSuffix = `${day}${daySuffix(day)}`;
    const CoveragePeriod = `${monthName} ${dayWithSuffix}, ${year} - ${monthName} ${dayWithSuffix}, ${year}`;

    lastPage.drawText(`${insuranceNumber}`, { x: 320, y: 2510, size: 25, font, color: rgb(0, 0, 0) });
    lastPage.drawText(`: ${name}`, { x: 320, y: 2450, size: 25, font, color: rgb(0, 0, 0) });
    lastPage.drawText(`${number}`, { x: 320, y: 2390, size: 25, font, color: rgb(0, 0, 0) });
    lastPage.drawText(`${email}`, { x: 320, y: 2340, size: 25, font, color: rgb(0, 0, 0) });
    lastPage.drawText(`${address}`, { x: 320, y: 2280, size: 25, font, color: rgb(0, 0, 0) });

    // lastPage.drawText(`${number}`, { x: 1200, y: 2540, size: 50, font, color: rgb(0, 0, 0) });
    lastPage.drawText(`${CoveragePeriod}`, { x: 330, y: 1740, size: 25, font, color: rgb(0, 0, 0) });

    stepLogs.push("✅ Certificate data injected. Saving PDF in memory...");
    const pdfBytes = await pdfDoc.save();

    stepLogs.push("📤 Sending generated certificate as response...");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=CERTIFICATE_${insuranceNumber}.pdf`);
    res.send(Buffer.from(pdfBytes));

  } catch (err) {
    console.error("❌ Error generating certificate:", err);
    stepLogs.push("❌ Exception thrown: " + err.message);
    return res.status(500).json({ error: "Internal Server Error", logs: stepLogs });
  }
});


app.get("/api/entries", (req, res) => {
  try {
    const filePath = path.join(__dirname, "data.xlsx");
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Excel file not found." });
    }

    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets["Sheet1"];
    const data = XLSX.utils.sheet_to_json(worksheet);

    res.status(200).json({ entries: data });
  } catch (err) {
    console.error("❌ Error fetching entries:", err);
    res.status(500).json({ error: "Failed to get entries." });
  }
});

// make a route that returns the certificate_template.pdf that is in root directory
app.get("/api/template", (req, res) => {
  const filePath = path.join(__dirname, "certificate_template.pdf");
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Template file not found." });
  }
  res.download(filePath, "certificate_template.pdf", (err) => {
    if (err) {
      console.error("❌ Error downloading template:", err);
      res.status(500).json({ error: "Failed to download template." });
    }
  }
  );});


app.put("/api/edit-entry/:insuranceNumber", (req, res) => {
  const insuranceNumber = req.params.insuranceNumber;
  const { name, email, address, number } = req.body;

  try {
    const filePath = path.join(__dirname, "data.xlsx");
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets["Sheet1"];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const index = data.findIndex(entry => entry.InsuranceNumber === insuranceNumber);
    if (index === -1) {
      return res.status(404).json({ error: "Entry not found." });
    }

    data[index] = {
      Name: name,
      Email: email,
      InsuranceNumber: insuranceNumber,
      Address: address,
      Number: number
    };

    const updatedSheet = XLSX.utils.json_to_sheet(data, { header: ["Name", "Email", "InsuranceNumber", "Address", "Number"] });
    workbook.Sheets["Sheet1"] = updatedSheet;
    XLSX.writeFile(workbook, filePath);

    res.status(200).json({ message: "Entry updated successfully." });
  } catch (err) {
    console.error("❌ Error updating entry:", err);
    res.status(500).json({ error: "Failed to update entry." });
  }
});

app.delete("/api/delete-entry/:insuranceNumber", (req, res) => {
  const insuranceNumber = req.params.insuranceNumber;

  try {
    const filePath = path.join(__dirname, "data.xlsx");
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets["Sheet1"];
    let data = XLSX.utils.sheet_to_json(worksheet);

    const newData = data.filter(entry => entry.InsuranceNumber !== insuranceNumber);

    if (newData.length === data.length) {
      return res.status(404).json({ error: "Entry not found to delete." });
    }

    const newSheet = XLSX.utils.json_to_sheet(newData, { header: ["Name", "Email", "InsuranceNumber", "Address", "Number"] });
    workbook.Sheets["Sheet1"] = newSheet;
    XLSX.writeFile(workbook, filePath);

    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting entry:", err);
    res.status(500).json({ error: "Failed to delete entry." });
  }
});




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

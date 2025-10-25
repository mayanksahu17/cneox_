const adminService = require("../services/admin_service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/user_service");
const user_service = require("../services/user_service");
const invetsments_service = require("../services/invetsments_service");

const generateAdminToken = (admin, secretKey) => {
  return jwt.sign(
    { id: admin.id, role: admin.role, email: admin.email },
    secretKey,
    { expiresIn: "6h" }
  );
};

module.exports = {
  getStats: async (req, res, next) => {
    try {
      const stats = await adminService.getStats();
      //const investments = await invetsments_service.getRecentInvestments(5);
      // const dailyInvestmentsAndWithdrawal =
      //   await adminService.getDepositsAndWithdrawals();
      // const investmentsByPackage =
      //   await invetsments_service.getInvestmentsByPackage();
      //const dailyUsers = await user_service.getDailyUsersSignups();
      // const returnsGiven = await adminService.getReturnsGiven();
      return res.status(200).json({
        stats,
        // investmentsByPackage,
        // dailyInvestmentsAndWithdrawal,
        // returnsGiven,
        // dailyUsers,
        //investments,
        success: true,
      });
    } catch (error) {
      console.log("Error: ", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getActiveUsers: async (req, res) => {
    try {
      const users = await adminService.getUsersWithActivePackages();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error("Error:", error.message || error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }, //user signin
  userSignin: async (req, res, next) => {
    try {
      const { userId, password } = req.body;

      // Check if email exists in users_table
      const userCreds = await getUserById(userId);
      if (!userCreds) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      if (!userCreds) {
        return res.status(400).json({
          success: false,
          message: "Account is not verified",
        });
      }
      if (userCreds.status === "blocked") {
        return res.status(400).json({
          success: false,
          message: "Your account is blocked. Kindly reach out to support team",
        });
      }

      if (password !== "1234") {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect." });
      }

      const token = jwt.sign(
        { id: userCreds.userId, email: userCreds.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      delete userCreds.password;
      res.status(200).json({ data: userCreds, success: true, token });
    } catch (error) {
      console.log("error in signin in", error);
      if (error == "")
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
    }
  },
  fetchBusinessData: async (req, res, next) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start and end dates are required" });
    }
    const userExists = await user_service.getUserById(userId);
    if (!userExists) {
      return res.status(400).json({
        message: "Bad equest",
        status: false,
      });
    }
    try {
      const businessData = await adminService.calculateBusiness(
        userId,
        startDate,
        endDate
      );
      return res.status(200).json(businessData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAdminById: async (req, res) => {
    try {
      const id = req.params.id;
      const admin = await adminService.getAdminById(id);
      if (admin) {
        res.status(200).json({ data: admin, success: true });
      } else {
        res.status(404).json({ message: "Admin not found", success: false });
      }
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  createAdmin: async (req, res) => {
    try {
      const { name, email, phone, password, security_pin } = req.body;
      const admin = await adminService.createAdmin(
        name,
        email,
        phone,
        password,
        security_pin
      );
      res.status(201).json({ data: admin, success: true });
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, phone, password, security_pin } = req.body;
      const admin = await adminService.updateAdmin(
        id,

        name,
        email,
        phone,
        password,
        security_pin
      );
      if (admin) {
        res.status(200).json({ data: admin, success: true });
      } else {
        res.status(404).json({ message: "Admin not found", success: false });
      }
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const id = req.params.id;
      const admin = await adminService.deleteAdmin(id);
      if (admin) {
        res.status(200).json({ data: admin, success: true });
      } else {
        res.status(404).json({ message: "Admin not found", success: false });
      }
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  verifyAdmin: async (req, res) => {
    try {
      const id = req.params.id;
      const admin = await adminService.verifyAdmin(id);
      if (admin) {
        res
          .status(200)
          .json({ message: "Admin verified successfully", success: true });
      } else {
        res.status(404).json({ message: "Admin not found", success: false });
      }
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  signup: async (req, res) => {
    try {
      const { name, email, phone, password, security_pin } = req.body;

      // Check if email already exists
      const existingAdmin = await adminService.getAdminByEmail(email);
      if (existingAdmin) {
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the admin
      const admin = await adminService.createAdmin(
        name,
        email,
        phone,
        hashedPassword,
        security_pin
      );
      res.status(201).json({ data: admin, success: true });
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password, security_pin } = req.body;
      console.log(email, password, security_pin);
      const parsedSecurityPin = parseInt(security_pin, 10);
      // Check if email exists
      const admin = await adminService.getAdminByEmail(email);
      if (!admin) {
        return res
          .status(404)
          .json({ message: "Admin not found", success: false });
      }
      if (admin.isVerified !== 1) {
        return res
          .status(401)
          .json({ message: "Not verified", success: false });
      }
      if (parsedSecurityPin !== admin.security_pin) {
        return res
          .status(401)
          .json({ message: "Invalid Security Pin", success: false });
      }
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid password", success: false });
      }
      let token;
      if (admin?.role === 1) {
        token = generateAdminToken(admin, process.env.JWT_ADMIN_SECRET);
      } else {
        token = generateAdminToken(admin, process.env.JWT_ADMIN_SECRET);
      }
      // Generate JWT token

      res.status(200).json({
        email: admin?.email,
        token,
        name: admin?.name,
        success: true,
        role: admin?.role,
      });
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getAllPackages: async (req, res) => {
    try {
      const data = await adminService.getAllActivatedPackages();
      res.status(200).json({ data, success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  getPackageById: async (req, res) => {
    try {
      const data = await adminService.getActivatedPackageById(
        req.params.transactionid
      );
      res.status(200).json({ data, success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  updatePackage: async (req, res) => {
    try {
      await adminService.updateActivatedPackage(
        req.params.transactionid,
        req.body
      );
      res.status(200).json({ message: "Updated Successfully", success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  deletePackage: async (req, res) => {
    try {
      await adminService.deleteActivatedPackage(req.params.transactionid);
      res.status(200).json({ message: "Deleted Successfully", success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};

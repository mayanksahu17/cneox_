const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userService = require("../services/user_service");
const authService = require("../services/auth_service");
const emailService = require("../services/mail_service");

const { formatToUKTime } = require("../utils/date");
const generateRandomCode = require("../utils/code-generator");
const {
  otpCache,
  otpAttemptsCache,
  blockedUsersCache,
} = require("../utils/cache");
const { generateStringAllCaps } = require("../utils/string-generator");
const voucher_service = require("../services/voucher_service");
const wallets_service = require("../services/wallets_service");
function isValidPin(pin) {
  const pinRegex = /^\d{4}$/;
  return pinRegex.test(pin);
}
module.exports = {
  //signup
  signup: async (req, res, next) => {
    try {
      const {
        referrer_id,
        position,
        username,
        country,
        phone,
        email,
        password,
        state,
        city,
      } = req.body;

      const requiredFields = [
        { name: "referrer_id", message: "Missing referrer_id field" },
        { name: "position", message: "Missing position field" },
        { name: "username", message: "Missing username field" },
        { name: "email", message: "Missing email field" },
        { name: "password", message: "Missing password field" },
      ];

      for (const field of requiredFields) {
        if (!req.body[field.name] || req.body[field.name] === "") {
          return res
            .status(400)
            .json({ success: false, message: field.message });
        }
      }
      console.log("Creating user for email", email);

      const securityPin = Math.floor(1000 + Math.random() * 9000);

      let referrer = referrer_id;
      if (!/^CROWN-\d{6}$/.test(referrer_id)) {
        referrer = "CROWN-100012"; //changed this to 29 to handle new admin
      }
      const referrerExists = await userService.getUserById(referrer_id);
      if (!referrerExists) {
        referrer = "CROWN-100012"; //changed this to 29 to handle new admin
      }
      //hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Call the service to create a new user
      const newUser = await authService.createUser({
        referrer_id: referrer,
        position,
        username,
        country,
        phone,
        email,
        hashedPassword,
        securityPin,
        createdAt: formatToUKTime(),
        newPassword: password,
        state,
        city,
      });

      // if (
      //   city &&
      //   (city.toLowerCase() === "kano" || city.toLowerCase() === "kaduna")
      // ) {
      //   const voucherId = generateStringAllCaps(10);
      //   const voucher = await voucher_service.createVoucher({
      //     userId: newUser,
      //     voucherId,
      //     wallet: "roi",
      //     amount: 50,
      //     created_by: "self",
      //   });
      //   await wallets_service.updateTotalTokenGenerated(newUser, 25);
      // }
      await authService.createReferrals(referrer, newUser, position, 1);
      console.log("calling binary table");
      //removed await
      await authService.insertIntoBinaryTree(referrer, newUser, position);
      console.log("binary done");

      console.log("Created user for email", email);
      const variables = {
        name: username,
        userId: newUser,
        email: email,
        pin: securityPin,
      };
      await userService.verifyUser(newUser);
      await emailService.sendCommonElasticMail({
        to: email,
        template: "credentials",
        variables,
      });
      res.status(201).json({ data: { userId: newUser }, success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  //user signin
  signin: async (req, res, next) => {
    try {
      const { userId, password, otp } = req.body;
      const requiredFields = [
        { name: "userId", message: "Missing userId field" },
        // { name: "otp", message: "Missing otp field" },
        { name: "password", message: "Missing password field" },
      ];

      for (const field of requiredFields) {
        if (!req.body[field.name] || req.body[field.name] === "") {
          return res
            .status(400)
            .json({ success: false, message: field.message });
        }
      }
      // if (blockedUsersCache.get(userId)) {
      //   return res.status(401).json({
      //     success: false,
      //     message: "You are temporarily blocked. Please try again later.",
      //   });
      // }
      // // Check if the OTP is correct
      // const cachedIncorrectAttempts = otpAttemptsCache.get(userId);
      // if (cachedIncorrectAttempts >= 3) {
      //   // Block the user for 1 hour
      //   blockedUsersCache.set(userId, true);
      //   return res.status(429).json({
      //     success: false,
      //     message: "Too many incorrect OTP attempts. Please try again later.",
      //   });
      // }
      // Retrieve the stored OTP
      // const storedOtp = otpCache.get(userId);
      // if (storedOtp !== otp) {
      //   // Increment incorrect OTP attempts and cache it
      //   const currentAttempts = cachedIncorrectAttempts
      //     ? cachedIncorrectAttempts + 1
      //     : 1;
      //   otpAttemptsCache.set(userId, currentAttempts);
      //   return res.status(401).json({
      //     success: false,
      //     message: "Wrong OTP",
      //   });
      // }
      // Check if email exists in users_table
      const userCreds = await userService.getUserById(userId);
      if (!userCreds) {
        return res.status(401).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      if (userCreds.status === "blocked") {
        return res.status(401).json({
          success: false,
          message: "Your account is blocked. Kindly reach out to support team",
        });
      }
      if (userCreds?.verified !== 1) {
        return res.status(401).json({
          success: false,
          message: "Please verify your account",
        });
      }

      // Compare hashed password with password entered by the user
      // const isMatch = await bcrypt.compare(password, userCreds.password);

      // if (!isMatch) {
      //   return res
      //     .status(401)
      //     .json({ success: false, message: "Password is incorrect." });
      // }
      console.log(userCreds);
      const token = jwt.sign(
        { id: userCreds.userId, email: userCreds.email },
        process.env.JWT_SECRET,
        { expiresIn: "365d" }
      );
      delete userCreds.password;
      // Reset incorrect OTP attempts on successful withdrawal
      // otpAttemptsCache.del(userId);
      // otpCache.del(userId);
      res.status(200).json({ data: userCreds, success: true, token });
    } catch (error) {
      console.log("error in signin in", error);
      if (error == "")
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
    }
  },
  sendLoginOTP: async (req, res, next) => {
    try {
      const { userId, password } = req.body;
      if (blockedUsersCache.get(userId)) {
        return res.status(401).json({
          success: false,
          message: "You are temporarily blocked. Please try again later.",
        });
      }
      // Check if the OTP request is cached
      const storedOtp = otpCache.get(userId);
      if (storedOtp) {
        return res.status(429).json({
          message: "Too many OTP requests. Please wait.",
          success: false,
        });
      }

      // Check if email exists in users_table
      const userCreds = await userService.getUserById(userId);
      if (!userCreds) {
        return res.status(401).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      if (userCreds.status === "blocked") {
        return res.status(401).json({
          success: false,
          message: "Your account is blocked. Kindly reach out to support team",
        });
      }
      if (userCreds?.verified !== 1) {
        return res.status(401).json({
          success: false,
          message: "Please verify your account",
        });
      }

      // Compare hashed password with password entered by the user
      const isMatch = await bcrypt.compare(password, userCreds.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Password is incorrect." });
      }

      delete userCreds.password;
      const otp = generateRandomCode();
      const variables = {
        userId,
        otp,
      };
      otpCache.set(userId, otp);
      console.log(otp);
      // Send OTP
      await emailService.sendCommonElasticMail({
        to: userCreds?.email,
        template: "newotp",
        variables,
      });
      return res
        .status(200)
        .json({ message: "OTP Sent successfully", success: true });
    } catch (error) {
      console.log("error in signin in", error);

      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  //send password reset email and save in db
  sendPasswordResetController: async (req, res) => {
    try {
      const { userId } = req.body;
      // Check if the OTP request is cached
      const storedOtp = otpCache.get(userId);
      if (storedOtp) {
        return res.status(429).json({
          message: "Too many OTP requests. Please wait.",
          success: false,
        });
      }
      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      const otp = generateRandomCode();
      const variables = {
        userId,
        otp,
      };

      otpCache.set(userId, otp);

      // Send OTP
      await emailService.sendCommonElasticMail({
        to: user?.email,
        template: "newotp",
        variables,
      });

      return res.json({
        message: "OTP email sent successfully.",
        timestamp: Date.now(),
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while sending the verification email.");
    }
  },
  //check otp
  changePassword: async (req, res, next) => {
    try {
      const { userId, otp, password } = req.body;
      // Check if the OTP is correct
      const cachedIncorrectAttempts = otpAttemptsCache.get(userId);
      if (cachedIncorrectAttempts >= 3) {
        // Block the user for 1 hour
        blockedUsersCache.set(userId, true);
        return res.status(429).json({
          success: false,
          message: "Too many incorrect OTP attempts. Please try again later.",
        });
      }
      // Retrieve the stored OTP
      const storedOtp = otpCache.get(userId);
      // Check if email exists in users_table
      const userCreds = await userService.getUserById(userId);
      if (!userCreds) {
        return res.status(401).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      if (storedOtp !== otp) {
        // Increment incorrect OTP attempts and cache it
        const currentAttempts = cachedIncorrectAttempts
          ? cachedIncorrectAttempts + 1
          : 1;
        otpAttemptsCache.set(userId, currentAttempts);
        return res.status(401).json({
          success: false,
          message: "Wrong OTP",
        });
      }
      if (storedOtp === otp) {
        //hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        await userService.updatePasswordByUserId({
          userId,
          hashedPassword,
          newPassword: password,
        });
        // Reset incorrect OTP attempts on successful withdrawal
        otpAttemptsCache.del(userId);
        otpCache.del(userId);
        const variables = {
          userId,
        };

        await emailService.sendCommonElasticMail({
          to: userCreds?.email,
          template: "passwordupdated",
          variables,
        });

        return res
          .status(200)
          .json({ message: "Password updated successfully", success: true });
      } else {
        return res.status(401).json({
          success: false,
          message: "Error in changing password",
        });
      }
    } catch (error) {
      console.log("error in changing password", error);
      if (error == "")
        res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
    }
  },
  //change pin by user id
  changePinByUserId: async (req, res, next) => {
    try {
      const { newPin, currentPin } = req.body;
      const userId = req.user?.id;

      const requiredFields = [
        { name: "newPin", message: "Missing newPin field" },
        { name: "currentPin", message: "Missing currentPin field" },
      ];

      for (const field of requiredFields) {
        if (!req.body[field.name] || req.body[field.name] === "") {
          return res
            .status(400)
            .json({ success: false, message: field.message });
        }
      }
      if (!isValidPin(currentPin) || !isValidPin(newPin)) {
        return res.status(400).json({
          message: "Both current pin and new pin must be 4 digits",
          success: false,
        });
      }
      const userCreds = await userService.getUserById(userId);
      if (!userCreds) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }
      if (Number(currentPin) !== Number(userCreds?.security_pin)) {
        return res
          .status(404)
          .json({ message: "Wrong security pin", success: false });
      }

      // Call the service to update the PIN
      await authService.changePinByUserId({
        userId,
        pin: newPin,
      });
      const variables = {
        userId,
      };

      await emailService.sendCommonElasticMail({
        to: userCreds?.email,
        template: "pinupdated",
        variables,
      });
      res.status(200).json({ success: true, message: "PIN updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  //update password by user id
  updatePasswordByUserId: async (req, res, next) => {
    try {
      const { newPassword, currentPassword } = req.body;
      const userId = req.user?.id;
      const requiredFields = [
        { name: "newPassword", message: "Missing newPassword field" },
        { name: "currentPassword", message: "Missing currentPassword field" },
      ];

      for (const field of requiredFields) {
        if (!req.body[field.name] || req.body[field.name] === "") {
          return res
            .status(400)
            .json({ success: false, message: field.message });
        }
      }
      // Check if email exists in users_table
      const userCreds = await userService.getUserById(userId);
      if (!userCreds) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId or you are a new user",
        });
      }
      // Compare hashed password with password entered by the user
      const isMatch = await bcrypt.compare(currentPassword, userCreds.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Current Password is incorrect." });
      }
      //hash password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await userService.updatePasswordByUserId({
        userId,
        hashedPassword,
        newPassword: newPassword,
      });
      const variables = {
        userId,
      };

      await emailService.sendCommonElasticMail({
        to: userCreds?.email,
        template: "passwordupdated",
        variables,
      });
      res.status(200).json({ success: true, message: "Password updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  verifyUserId: async (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        status: "fail",
        msg: "Token not provided in the request body.",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userService.verifyUser(decoded?.id);

      const variables = {
        name: user?.name,
        userId: decoded?.id,
        email: user?.email,
        pin: user?.security_pin,
        withdrawal_wallet: user?.withdrawal_wallet || "-",
      };

      await emailService.sendCommonElasticMail({
        to: user?.email,
        template: "credentials",
        variables,
      });

      return res.status(200).json({
        status: "success",
        message: "user verified successfully.",
      });
    } catch (error) {
      console.log(error);

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "fail",
          msg: "Token has expired.",
        });
      }

      return res.status(401).json({
        status: "fail",
        msg: "Invalid token.",
      });
    }
  },
};

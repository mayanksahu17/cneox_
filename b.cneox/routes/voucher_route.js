const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucher_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

router.get("/user", authenticateToken, voucherController.getAllVouchersById);
router.get(
  "/user-active",
  authenticateToken,
  voucherController.getAllActiveVouchersById
);
router.get(
  "/admin",
  authenticateTokenAdmin,
  voucherController.getAllAdminVouchers
);
router.get("/", authenticateTokenAdmin, voucherController.getAllVouchers);

router.post(
  "/admin",
  authenticateTokenAdmin,
  voucherController.createVoucherAdmin
);
router.post("/", authenticateToken, voucherController.createVoucher);
router.put("/", authenticateToken, voucherController.createVoucher);

module.exports = router;

const express = require("express");
const router = express.Router();
const withdrawalController = require("../controllers/withdrarwal_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

router.post(
  "/approveOrRejectWithdrawals",
  authenticateTokenAdmin,
  withdrawalController.approveOrRejectWithdrawals
);

router.get(
  "/fetch-all",
  authenticateTokenAdmin,
  withdrawalController.getAllWithdrawals
);
router.get(
  "/fetch-roi",
  authenticateTokenAdmin,
  withdrawalController.getAllROIWithdrawals
);
router.get(
  "/fetch-interest",
  authenticateTokenAdmin,
  withdrawalController.getAllIntrestWithdrawals
);
router.get(
  "/fetch-rb",
  authenticateTokenAdmin,
  withdrawalController.getAllRBWithdrawals
);

router.get(
  "/user",
  authenticateToken,
  withdrawalController.getAllWithdrawalsByUserId
);

router.post(
  "/create_withdrawal",
  authenticateToken,
  withdrawalController.createWithdrawal
);

module.exports = router;

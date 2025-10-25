const express = require("express");
const router = express.Router();
const referralController = require("../controllers/referral_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

router.get(
  "/binary-tree/:userId",
  authenticateToken,
  referralController.getBinaryTreeByUserId
);
router.get(
  "/binary-tree-admin/:userId",
  authenticateTokenAdmin,
  referralController.getBinaryTreeByUserIdAdmin
);
router.get(
  "/referrer",
  authenticateToken,
  referralController.getReferralsByReferrerId
);
router.get(
  "/downlines",
  authenticateToken,
  referralController.findUserDownline
);
router.get("/", authenticateToken, referralController.getAllReferrals);

router.get(
  "/:referredId",
  authenticateToken,
  referralController.getReferralsByReferredId
);
router.get(
  "/direct-referrals/:userId",
  authenticateToken,
  referralController.getDirectReferralsByReferredId
);

module.exports = router;

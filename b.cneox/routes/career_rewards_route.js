const express = require("express");
const router = express.Router();
const careerRewardsController = require("../controllers/carrer_rewards_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");
router.get(
  "/user",
  authenticateToken,
  careerRewardsController.getAllCareerRewardsByUserId
);
router.post("/", authenticateToken, careerRewardsController.createCareerReward);

router.get(
  "/",
  authenticateTokenAdmin,
  careerRewardsController.getAllCareerRewards
);

module.exports = router;

const careerRewardsService = require("../services/career_rewards_service");

module.exports = {
  createCareerReward: async (req, res) => {
    try {
      const { userId, achievement, reward_amount } = req.body;

      // Call the service to create the career reward
      await careerRewardsService.createCareerReward(
        userId,
        achievement,

        reward_amount
      );

      res.status(201).json({ message: "Career reward created successfully" });
    } catch (error) {
      console.error("Error creating career reward:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllCareerRewards: async (req, res) => {
    try {
      const careerRewards = await careerRewardsService.getAllCareerRewards();
      res.status(200).json({ data: careerRewards, success: true });
    } catch (error) {
      console.error("Error retrieving career rewards:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  getAllCareerRewardsByUserId: async (req, res) => {
    try {
      const userId = req.user?.id;

      // Call the service to get all career rewards by user ID
      const careerRewards =
        await careerRewardsService.getAllCareerRewardsByUserId(userId);

      res.status(200).json({ data: careerRewards, success: true });
    } catch (error) {
      console.error("Error retrieving career rewards by user ID:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

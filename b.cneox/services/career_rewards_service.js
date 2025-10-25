const connectionPool = require("./db_service");

module.exports = {
  createCareerReward: ({
    userId,
    achievement,
    reward_amount,
    reward_type,
    reward_id,
    date,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        const query =
          "INSERT INTO career_rewards (userId, achievement,  reward_amount,reward_type,reward_id,date) VALUES ( ?,?,?,?,?,?)";
        const values = [
          userId,
          achievement,

          reward_amount,
          reward_type,
          reward_id,
          date,
        ];

        connection.query(query, values, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }

          resolve(results);
        });
      });
    });
  },

  getAllCareerRewards: () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        const query = `
          SELECT c.id, c.userId as user_id,u.name,u.email,u.country, 
          c.achievement, DATE_FORMAT(c.date, '%Y-%m-%d') AS date, c.reward_amount 
          FROM career_rewards c left join users_table u on u.userId=c.userId order by date desc`;
        connection.query(query, (err, results) => {
          connection.release();

          if (err) {
            reject(err);
            return;
          }

          resolve(results);
        });
      });
    });
  },

  getAllCareerRewardsByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        const query = `
SELECT 
    id, 
    userId, 
    achievement,
    DATE_FORMAT(date, '%Y-%m-%d') AS date,reward_type,
   reward_amount 
FROM career_rewards  where userId =?
`;
        connection.query(query, [userId], (err, results) => {
          connection.release();

          if (err) {
            reject(err);
            return;
          }

          resolve(results);
        });
      });
    });
  },
  getAllCareerRewardsByUserIdLimit: (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        const query = `
SELECT 
    id, 
    userId, 
    achievement as type,
    DATE_FORMAT(date,  '%e %b %Y') AS transaction_date,reward_type,
   reward_amount as amount
FROM career_rewards  where userId =? limit 5
`;
        connection.query(query, [userId], (err, results) => {
          connection.release();

          if (err) {
            reject(err);
            return;
          }

          resolve(results);
        });
      });
    });
  },

  getUserCareerAndRequiredBusinessVolume: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        // Combine queries to fetch both the current binary career level and the required business volume in a single statement
        const combinedQuery = `
              WITH CurrentBusiness AS (
  SELECT 
    left_business, 
    right_business
  FROM 
    binary_tree
  WHERE 
    user_id = ?
),

HighestPossibleLevel AS (
  SELECT 
    MAX(level) AS highestLevel
  FROM 
    master_table_career_plan_binary
  WHERE 
    actual_required <= (SELECT left_business FROM CurrentBusiness) 
    AND 
    actual_required <= (SELECT right_business FROM CurrentBusiness)
),

CurrentUserLevel AS (
  SELECT 
    binary_career_level
  FROM 
    user_career_levels
  WHERE 
    user_id = ?
),

RewardAmount AS (
  SELECT 
    SUM(reward_amount) AS totalReward
  FROM 
    master_table_career_plan_binary
  WHERE 
    level > (SELECT binary_career_level FROM CurrentUserLevel) 
    AND 
    level <= (SELECT highestLevel FROM HighestPossibleLevel)
),

RequiredBusinessVolume AS (
  SELECT 
    actual_required AS requiredVolume
  FROM 
    master_table_career_plan_binary
  WHERE 
    level = (SELECT highestLevel FROM HighestPossibleLevel)
)

SELECT 
  c.binary_career_level AS currentLevel, 
  h.highestLevel, 
  cb.left_business AS currentLeftBusiness,
  cb.right_business AS currentRightBusiness,
  r.requiredVolume AS requiredBusinessVolumeForHighestLevel,
  COALESCE(ra.totalReward, 0) AS totalReward
FROM 
  CurrentUserLevel c
CROSS JOIN 
  HighestPossibleLevel h
CROSS JOIN 
  CurrentBusiness cb
LEFT JOIN 
  RequiredBusinessVolume r ON 1=1
LEFT JOIN 
  RewardAmount ra ON 1=1;


            `;

        connection.query(combinedQuery, [userId, userId], (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }

          const currentLevel = result[0].currentLevel;
          const requiredBusinessVolume =
            result[0].requiredBusinessVolumeForHighestLevel;
          const reward_amount = result[0].totalReward;
          const highestLevel = result[0].highestLevel;
          const currentLeftBusiness = result[0].currentLeftBusiness;
          const currentRightBusiness = result[0].currentRightBusiness;

          resolve({
            currentLevel,
            requiredBusinessVolume,
            reward_amount,
            currentLeftBusiness,
            currentRightBusiness,
            highestLevel,
          });
        });
      });
    });
  },

  getRewardForAchievement: async (userId, achievement) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        // Fetch the reward for a specific achievement for the user
        const rewardQuery =
          "SELECT * FROM career_rewards WHERE userId = ? AND achievement = ?";
        connection.query(rewardQuery, [userId, achievement], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }

          if (results.length > 0) {
            resolve(results[0]); // Returning the first matching reward if there are any matches.
          } else {
            resolve(null); // If no matching rewards are found, resolve with null.
          }
        });
      });
    });
  },
  getRewardAmountForBinaryLevel: async (level) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        // Fetch the reward for a specific achievement for the user
        const rewardQuery =
          "SELECT reward_amount FROM master_table_career_plan_binary WHERE level = ? ";
        connection.query(rewardQuery, [level], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          console.log(results);
          if (results.length > 0) {
            resolve(results[0]); // Returning the first matching reward if there are any matches.
          } else {
            resolve(null); // If no matching rewards are found, resolve with null.
          }
        });
      });
    });
  },

  updateCareerLevelByType: async ({ userId, type, level }) => {
    console.log(userId, type, level);
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        if (!["binary_career_level"].includes(type)) {
          reject(new Error("Invalid career level type"));
          return;
        }

        const updateQuery = `
          UPDATE user_career_levels 
          SET 
            ${type} = ${level}
          WHERE user_id = ?
        `;

        connection.query(updateQuery, [userId], (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });
  },

  getUserCareerLevels: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          `SELECT
    binary_career_level
  
FROM user_career_levels
WHERE user_id = ?;
`,
          [id],
          (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve(results[0]);
          }
        );
      });
    });
  },
};

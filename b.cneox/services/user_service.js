const connectionPool = require("./db_service");
const generateRandomCode = require("../utils/code-generator");

module.exports = {
  getReports: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.log("Error in creating connection for report service:", err);
          reject(err);
          return;
        }

        try {
          // Execute the SQL queries for each report
          const queries = [
            `SELECT DATE(createdAt) AS date, COUNT(*) AS total_users_registered 
            FROM users_table GROUP BY DATE(createdAt)
             ORDER BY DATE(createdAt) DESC;`,

            `SELECT DATE(investment_date) AS date,
              SUM( invested_amount ) AS total_self_investment,
              SUM(CASE WHEN type = 'powerleg' THEN invested_amount ELSE 0 END) AS total_powerleg_investment,  
              SUM(CASE WHEN type = 'free' THEN invested_amount ELSE 0 END) AS total_free_investment, 
              SUM(CASE WHEN type in ('self','downline') THEN deposit_amount ELSE 0 END) AS total_cash_investment, 
              SUM(CASE WHEN type in ('self','downline') THEN token_amount ELSE 0 END) AS total_token_investment 
            FROM investments_table GROUP BY DATE(investment_date) ORDER BY DATE(investment_date) DESC;`,

            `SELECT DATE(date) AS date, 
              SUM(CASE WHEN wallet_type = 'roi' AND status = 'approved' THEN amount ELSE 0 END) AS total_roi_withdrawal, 
              SUM(CASE WHEN wallet_type = 'interest' AND status = 'approved' THEN amount ELSE 0 END) AS total_interest_withdrawal,  
              SUM(CASE WHEN wallet_type = 'r&b' AND status = 'approved' THEN amount ELSE 0 END) AS total_rnb_withdrawal 
            FROM withdrawal_table GROUP BY DATE(date) ORDER BY DATE(date) DESC;`,
          ];
          const results = [];

          queries.forEach((query, index) => {
            connection.query(query, (err, result) => {
              if (err) {
                console.log(`Error in query ${index + 1}:", err`);
                reject(err);
                return;
              }
              results.push({ reportNumber: index + 1, data: result });

              if (results.length === queries.length) {
                resolve(results);
              }
            });
          });
        } catch (error) {
          console.log("Error in executing queries for reports:", error);
          reject(error);
        } finally {
          console.log("Connection is released for report service");
          connection.release();
        }
      });
    });
  },
  getAllUserData: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
        SELECT 
    u.userId, u.name, u.email, u.phone, u.country, u.referrer_id, u.verified,
    CONCAT(UPPER(SUBSTRING(u.position, 1, 1)), LOWER(SUBSTRING(u.position, 2))) AS position, 
    CONCAT(UPPER(SUBSTRING(u.status, 1, 1)), LOWER(SUBSTRING(u.status, 2))) AS status,
     DATE_FORMAT(u.createdAt, '%Y-%m-%d')  AS createdAt,
    u.security_pin,
    w.interest_wallet AS interest, w.referral_binary_wallet AS rnb,w.roi_wallet as roi,
    GROUP_CONCAT(DISTINCT  p.package_name) AS packages,
    CASE WHEN u.referrer_id = 'CROWN-100012' THEN 'Crown Bankers' ELSE s.name END AS sponsorName,
    CASE WHEN u.referrer_id = 'CROWN-100012' THEN 'crownbankers@gmail.com' ELSE s.email END AS sponsorEmail,
        COALESCE(SUM(i.invested_amount), 0) AS totalInvestment

FROM users_table u
LEFT JOIN wallets_table w ON u.userId = w.userId
LEFT JOIN investments_table i ON u.userId = i.user_id
LEFT JOIN master_table_packages p ON i.package_id = p.package_id
LEFT JOIN users_table s ON u.referrer_id = s.userId
GROUP BY u.userId  ORDER BY u.createdAt DESC;
        `;

        connection.query(selectQuery, (err, results) => {
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
  getDailyUsersSignups: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
        SELECT
    DATE(date_range.date) AS signup_date,
    DAYNAME(date_range.date) AS day_of_week,
    COUNT(u.id) AS signups_count
FROM
    (SELECT CURDATE() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY AS date
     FROM (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
     CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
     CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c) AS date_range
LEFT JOIN
    users_table u ON DATE(u.createdAt) = DATE(date_range.date)
WHERE
    date_range.date >= CURDATE() - INTERVAL 15 DAY
GROUP BY
    DATE(date_range.date), DAYNAME(date_range.date)
ORDER BY
    DATE(date_range.date) DESC;

        `;

        connection.query(selectQuery, (err, results) => {
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
  updateUserStatus: async ({ userId, newStatus }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE users_table SET status = ? WHERE userId = ?";

        connection.query(updateQuery, [newStatus, userId], (err, results) => {
          connection.release();
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve(results.affectedRows);
        });
      });
    });
  },

  verifyUser: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        // First, perform the update operation
        const updateQuery = "UPDATE users_table SET verified=1 WHERE userId=?";
        connection.query(updateQuery, [userId], (err, updateResults) => {
          if (err) {
            connection.release();
            reject(err);
            return;
          }

          // If update was successful, retrieve the needed columns
          const selectQuery =
            "SELECT u.name, u.security_pin, u.email,u.new_password,w.withdrawal_wallet FROM users_table u left join wallets_table w on u.userId=w.userId WHERE u.userId=?";
          connection.query(selectQuery, [userId], (err, selectResults) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }

            // Resolve with the retrieved data
            resolve(selectResults[0]); // Assuming userId is unique, there should be only one result.
          });
        });
      });
    });
  },
  //get user data by id
  getUserById: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `SELECT u.userId, u.name, u.email, u.phone, u.security_pin,
           u.country, u.dob, u.referrer_id AS sponsorId, s.name AS sponsorName, 
           u.position, u.password,u.verified AS userVerified,u.status,
           u.verified ,u.profile_picture,u.profile_cover 
           FROM users_table AS u 
           LEFT JOIN users_table AS s 
           ON u.referrer_id = s.userId WHERE u.userId = ?
           `;

        connection.query(selectQuery, [id], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results[0]);
        });
      });
    });
  },
  getUserDataByUserId: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `SELECT u.userId, u.name, u.email, u.phone,u.security_pin,
           u.country, u.dob, u.referrer_id AS sponsorId, s.name AS sponsorName, 
           u.position,u.verified AS userVerified,u.status,
           u.verified ,u.profile_picture,u.profile_cover 
           FROM users_table AS u 
           LEFT JOIN users_table AS s 
           ON u.referrer_id = s.userId WHERE u.userId = ?
           `;

        connection.query(selectQuery, [id], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results[0]);
        });
      });
    });
  },
  getUserDataByUserIdForAdmin: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `SELECT u.userId, u.name, u.email, u.phone,w.withdrawal_wallet,
           u.country, 
           u.position,u.security_pin,u.new_password
           FROM users_table AS u 
           LEFT JOIN wallets_table AS w
           ON u.userId = w.userId WHERE u.userId = ?
           `;

        connection.query(selectQuery, [id], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results[0]);
        });
      });
    });
  },
  getUserKundli: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
      SELECT
    U.userId AS user_id,
    U.name AS user_name,
    U.email,
    U.phone,
    U.country,
    U.security_pin,
    U.referrer_id,U.new_password,
    S.email AS sponsor_email,
    S.name AS sponsor_name,
    BT.left_downlines,
    BT.right_downlines,
    R.count_referrals AS count_referrers

FROM users_table U
LEFT JOIN users_table S ON U.referrer_id = S.userId
LEFT JOIN binary_tree BT ON U.userId = BT.user_id
LEFT JOIN (SELECT referrer_id, COUNT(*) AS count_referrals FROM referrals_table WHERE parent_id = 1 GROUP BY referrer_id) R ON U.userId = R.referrer_id
WHERE U.userId = ?
GROUP BY
    U.userId, U.name, U.email, U.phone, U.country, U.security_pin,
     U.referrer_id, S.email, S.name, BT.left_downlines, BT.right_downlines,
      R.count_referrals ;
        
        `;
        connection.query(selectQuery, [id], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results[0]);
        });
      });
    });
  },
  getUserDataById: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT name, security_pin, email FROM users_table WHERE userId=?";
        connection.query(selectQuery, [userId], (err, results) => {
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
  getUserNameById: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT userId,name FROM users_table where userId = ?";

        connection.query(selectQuery, [id], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results[0]);
        });
      });
    });
  },

  getAllUsers: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT country, count(id) AS total_users, COUNT(CASE WHEN position = 'left' THEN 1 END) AS left_position_users, COUNT(CASE WHEN position = 'right' THEN 1 END) AS right_position_users, count(verified = 1) AS verified_users FROM users_table GROUP BY country";

        connection.query(selectQuery, [id], (err, results) => {
          connection.release();
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(results);
        });
      });
    });
  },
  fefchAllUsersData: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT id, userId, name, email, phone, country, dob, referrer_id, position, verified, passport, national_id, driving_license, createdAt  FROM users_table";

        connection.query(selectQuery, (err, results) => {
          connection.release();
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(results);
        });
      });
    });
  },

  //get user data by email
  getUserAndWalletData: async ({ userId }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
        SELECT 
          u.userId, u.name, u.email, u.phone, u.password, u.country, w.withdrawal_wallet,u.state,u.city,
          u.dob, u.referrer_id, u.position, u.status, u.verified,u.security_pin,
          w.roi_wallet, w.referral_wallet, 
          w.binary_wallet, w.total_earning, w.total_investment, 
           w.total_withdrawal, w.referral_binary_wallet, w.total_voucher_investment,
          w.toal_voucher_generated,
          w.interest_wallet,  w.direct_business 
        FROM users_table u 
        LEFT JOIN wallets_table w ON u.userId = w.userId 
        WHERE u.userId = ?`;

        connection.query(selectQuery, [userId], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          if (results.length === 0) {
            resolve(false);
          } else {
            resolve(results[0]);
          }
        });
      });
    });
  },
  getUserDashboardData: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
      WITH RewardSums AS (
    SELECT 
        userId,
        SUM(CASE WHEN reward_type = 'binary_business' THEN reward_amount ELSE 0 END) AS sum_binary_business
    FROM career_rewards
    WHERE userId = ?
    GROUP BY userId
)

SELECT 
    u.userId,u.name,w.*,u.profile_picture,u.profile_cover,u.status,  u.referrer_id,
    S.email AS sponsor_email,
    S.name AS sponsor_name,
    ucl.binary_career_level,
    mcpb.business_amount AS binary_next_level_business,
    mcpb.reward_amount AS binary_next_level_reward,
mcpb.actual_required AS binary_next_level_actual_required,
mcpbcurrent.name AS binary_current_level_name,mcpb.name AS binary_next_level_name,
    b.left_business,
    b.right_business,

    rs.sum_binary_business


FROM users_table u
LEFT JOIN users_table S ON u.referrer_id = S.userId
JOIN wallets_table w ON u.userId = w.userId
JOIN user_career_levels ucl ON u.userId = ucl.user_id
LEFT JOIN master_table_career_plan_binary mcpbcurrent ON ucl.binary_career_level = mcpbcurrent.level
LEFT JOIN master_table_career_plan_binary mcpb ON ucl.binary_career_level + 1 = mcpb.level
LEFT JOIN RewardSums rs ON u.userId = rs.userId
JOIN binary_tree b ON u.userId = b.user_id
WHERE u.userId = ?
        
        `;

        connection.query(
          selectQuery,
          [userId, userId, userId],
          (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            if (results.length === 0) {
              resolve(false);
            } else {
              resolve(results[0]);
            }
          }
        );
      });
    });
  },
  getUserLatestTransactions: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
      SELECT
    txn_id,
    user_id,
   DATE_FORMAT(txn_date,  '%e %b %Y')   AS transaction_date,
    amount,
    
    crypto_type,
    'withdrawal' AS type
   
   
    
FROM (
    SELECT * FROM withdrawal_table
    WHERE user_id = ?
    ORDER BY txn_date DESC
    LIMIT 2
) AS last_two_withdrawals
UNION ALL
SELECT
    investment_id AS txn_id,
    user_id,
   DATE_FORMAT(investment_date,  '%e %b %Y')    AS transaction_date,
    invested_amount AS amount,
  
    crypto_type,
 
   'investment' AS type
 
FROM (
    SELECT * FROM investments_table
    WHERE user_id = ?
    ORDER BY investment_date DESC
    LIMIT 2
) AS last_two_investments
        
        `;

        connection.query(
          selectQuery,
          [userId, userId, userId],
          (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }

            resolve(results);
          }
        );
      });
    });
  },

  //get userId by email
  findByEmail: async ({ email }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = "SELECT userId FROM users_table WHERE email = ?";
        connection.query(selectQuery, [email], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          // console.log("first");
          if (results.length === 0) {
            resolve(false);
          } else {
            resolve(results[0]);
          }
        });
      });
    });
  },

  //get sponsor details by id
  getSponsorById: async (sponsorId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT userId, name, email, verified FROM users_table WHERE userId = ?";

        connection.query(selectQuery, [sponsorId], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          if (results.length > 1) {
            console.log("Multiple users found with same ID");
          }
          resolve(results[0]);
        });
      });
    });
  },

  markUserEmailVerified: async ({ email }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE users_table SET verified = 1 WHERE email = ?";

        connection.query(updateQuery, [email], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    });
  },
  markUserIdActive: async ({ userId }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE users_table SET status = 'active' WHERE userId = ? AND status NOT IN ('suspended', 'suspected');";

        connection.query(updateQuery, [userId], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    });
  },

  verifyUserByPin: async ({ userId, pin }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "SELECT email FROM users_table WHERE userId = ? AND security_pin = ?";

        connection.query(updateQuery, [userId, pin], (err, results) => {
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

  // user : update
  updateuserById: async ({ id, name, email, phone, country }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE users_table SET name = ?, email = ?, country=?,phone=? WHERE userId = ?";

        connection.query(
          updateQuery,
          [name, email, phone, country, id],
          (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve();
          }
        );
      });
    });
  },

  // update or forgot password
  updatePassword: async ({ email, hashedPassword, newPassword }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE users_table SET password = ?, new_password = ? WHERE email = ?";

        connection.query(
          updateQuery,
          [hashedPassword, newPassword, email],
          (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve();
          }
        );
      });
    });
  },
  updatePasswordByUserId: async ({ userId, hashedPassword, newPassword }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        console.log(userId, hashedPassword, newPassword);

        if (err) throw err;
        const updateQuery =
          "UPDATE users_table SET password = ?, new_password = ? WHERE userId = ?";

        connection.query(
          updateQuery,
          [hashedPassword, newPassword, userId],
          (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve();
          }
        );
      });
    });
  },

  // update profile
  updateProfile: async ({ id, name, dob, phoneNo, country }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE users_table SET name = ?, dob = ?,phone=?,country=? WHERE userId = ?";

        connection.query(
          updateQuery,
          [name, dob, phoneNo, country, id],
          (err, results) => {
            console.log(
              updateQuery,
              name,
              dob,
              phoneNo,

              country,
              id
            );

            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve();
          }
        );
      });
    });
  },
  updateProfileAdmin: async ({
    id,
    name,
    phone,
    country,
    securityPin,
    email,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE users_table SET name = ?, phone = ?,country=?,security_pin=?,email=? WHERE userId = ?";

        connection.query(
          updateQuery,
          [name, phone, country, securityPin, email, id],
          (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve();
          }
        );
      });
    });
  },
  // services/reportService.js

  getDailyReport: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
         SELECT 
    DATE_FORMAT(date, '%Y-%m-%d') as date, 
    total_signups, 
    investment, 
    deposit, 
    cash_investment, 
    token_investment, 
    powerleg_free_investment, 
    roi_withdrawal, 
    interest_withdrawal, 
    rnb_withdrawal 
FROM DailyReport
ORDER BY date DESC;

         `;
        connection.query(selectQuery, (err, results) => {
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
  getReportByCountry: (country) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
         SELECT
              u.country,
              COUNT(u.userId) AS users,
              SUM(w.roi_wallet) AS total_roi_wallet,
              SUM(w.referral_binary_wallet) AS total_referral_binary_wallet,
              SUM(w.interest_wallet) AS total_interest_wallet,
              SUM(w.total_earning) AS total_earning,
              SUM(w.total_investment) AS total_investment,
              SUM(w.total_deposit) AS total_cash_investment,
              SUM(w.total_voucher_investment) AS total_voucher_investment,
              SUM(w.direct_business) AS total_direct_business,
              SUM(w.total_withdrawal) AS total_withdrawal
          FROM users_table u
          JOIN wallets_table w ON u.userId = w.userId
          GROUP BY u.country
        `;

        connection.query(selectQuery, [country], (err, results) => {
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

  getNotificationSettingsById: (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT * FROM notifications_settings WHERE user_id = ?";
        connection.query(selectQuery, [id], (err, results) => {
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

  updateNotificationSettingsById: (id, newSettings) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const checkUserQuery =
          "SELECT * FROM notifications_settings WHERE user_id = ?";
        connection.query(checkUserQuery, [id], (err, results) => {
          if (err) {
            connection.release();
            reject(err);
            return;
          }

          if (results.length === 0) {
            const insertQuery =
              "INSERT INTO notifications_settings (user_id, isUnusualChecked, isSuspiciousChecked, isSalesChecked, isNewFeatureChecked, isTipsChecked) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [
              id,
              newSettings.isUnusualChecked,
              newSettings.isSuspiciousChecked,
              newSettings.isSalesChecked,
              newSettings.isNewFeatureChecked,
              newSettings.isTipsChecked,
            ];

            connection.query(insertQuery, values, (err, results) => {
              connection.release();
              if (err) {
                reject(err);
                return;
              }
              resolve(results);
            });
          } else {
            const updateQuery =
              "UPDATE notifications_settings SET isUnusualChecked = ?, isSuspiciousChecked = ?, isSalesChecked = ?, isNewFeatureChecked = ?, isTipsChecked = ? WHERE user_id = ?";
            const updateValues = [
              newSettings.isUnusualChecked,
              newSettings.isSuspiciousChecked,
              newSettings.isSalesChecked,
              newSettings.isNewFeatureChecked,
              newSettings.isTipsChecked,
              id,
            ];

            connection.query(updateQuery, updateValues, (err, results) => {
              connection.release();
              if (err) {
                reject(err);
                return;
              }
              resolve(results);
            });
          }
        });
      });
    });
  },
};

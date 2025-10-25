const connectionPool = require("./db_service");
const statsQuery = `
  SELECT
    (SELECT COUNT(*) FROM users_table) AS total_users,
    (SELECT COUNT(*) FROM users_table WHERE verified = 1) AS total_verified_users,
    (SELECT COUNT(*) FROM users_table WHERE verified = 0) AS total_unverified_users,
    (SELECT SUM(total_investment) FROM wallets_table) AS total_investment,
    (SELECT SUM(invested_amount) FROM investments_table) AS total_voucher_investment,
    (SELECT SUM(total_deposit) FROM wallets_table) AS sum_of_total_deposits,
    (SELECT SUM(amount) FROM withdrawal_table where status='approved' ) AS sum_of_total_withdrawals,
    (SELECT SUM(amount) FROM referral_transaction_table) AS total_referral_given,
    (SELECT SUM(amount) FROM binary_transaction_table) AS total_binary_given,
    (SELECT SUM(amount) FROM roi_txn_table) AS total_roi_given,
    (SELECT SUM(amount) FROM free_accounts) AS total_free_amount,
    (SELECT SUM(amount) FROM powerleg_accounts) AS total_powerleg_amount
  FROM DUAL;  -- DUAL is a table automatically provided by Oracle and some other database systems which can be used to select a constant, pseudo columns, or functions, like in this case.
`;

module.exports = {
  getDepositsAndWithdrawals: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
      SELECT
    date_range.date AS transaction_date,
    DAYNAME(date_range.date) AS day_of_week,
    COUNT(DISTINCT u.id) AS signups_count,
    COALESCE(SUM(i.invested_amount), 0) AS total_investment_amount,
    COALESCE(SUM(CASE WHEN w.status = 'approved' THEN w.amount ELSE 0 END), 0) AS total_withdrawal_amount
FROM
    (SELECT CURDATE() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY AS date
     FROM (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
     CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
     CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c) AS date_range
LEFT JOIN
    users_table u ON DATE(u.createdAt) = DATE(date_range.date)
LEFT JOIN
    investments_table i ON DATE(i.investment_date) = DATE(date_range.date)
LEFT JOIN
    withdrawal_table w ON DATE(w.date) = DATE(date_range.date) AND w.status = 'approved'
WHERE
    date_range.date >= CURDATE() - INTERVAL 15 DAY
GROUP BY
    date_range.date, DAYNAME(date_range.date)
ORDER BY
    date_range.date DESC;

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
  getReturnsGiven: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
      SELECT
    date_range.date AS transaction_date,
    DAYNAME(date_range.date) AS day_of_week,
    COALESCE(SUM(CASE WHEN r.status = 'completed' THEN r.amount ELSE 0 END), 0) AS total_roi_amount,
    COALESCE(SUM(rt.amount), 0) AS total_referral_amount,
    COALESCE(SUM(bt.amount), 0) AS total_binary_amount,
    COALESCE(SUM(cr.reward_amount), 0) AS total_career_rewards_amount
FROM
    (SELECT CURDATE() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY AS date
     FROM (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
     CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
     CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c) AS date_range
LEFT JOIN
    roi_txn_table r ON DATE(r.date) = DATE(date_range.date) 
LEFT JOIN
    referral_transaction_table rt ON DATE(rt.date) = DATE(date_range.date)
LEFT JOIN
    binary_transaction_table bt ON DATE(bt.date) = DATE(date_range.date) 
LEFT JOIN
    career_rewards cr ON DATE(cr.date) = DATE(date_range.date)
WHERE
    date_range.date >= CURDATE() - INTERVAL 15 DAY
GROUP BY
    date_range.date, DAYNAME(date_range.date)
ORDER BY
    date_range.date DESC;


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
  getUserRewardSum: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          `
         SELECT
    SUM(reward_amount) AS career_rewards
FROM career_rewards
WHERE userId = ?;

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
  getWithdrawalInfo: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          `
       SELECT
    SUM(CASE WHEN WD.wallet_type = 'interest' and status='approved' THEN WD.amount ELSE 0 END) AS withdrawal_interest,
    SUM(CASE WHEN WD.wallet_type = 'r&b' and status='approved' THEN WD.amount ELSE 0 END) AS withdrawal_rnb,
    SUM(CASE WHEN WD.wallet_type = 'roi' and status='approved' THEN WD.amount ELSE 0 END) AS withdrawal_roi
FROM withdrawal_table WD
WHERE WD.user_id = ?;


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
  getInvestmentInfo: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          `
        SELECT
    SUM(CASE WHEN I.type = 'self' THEN I.deposit_amount ELSE 0 END) AS cash_investment,
    SUM(CASE WHEN I.type = 'self' THEN I.token_amount ELSE 0 END) AS voucher_investment,
    SUM(CASE WHEN I.type = 'downline' THEN I.invested_amount ELSE 0 END) AS downline_investment,
    SUM(CASE WHEN I.type = 'powerleg' THEN I.deposit_amount ELSE 0 END) AS powerleg_investment,
    SUM(CASE WHEN I.type = 'free' THEN I.deposit_amount ELSE 0 END) AS free_investment,
    DATE_FORMAT(MAX(I.investment_date), '%Y-%m-%d') AS last_investment_date
FROM investments_table I
WHERE I.user_id = ?;


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
  getIntraWalletInfo: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          `
        SELECT
    SUM(CASE WHEN WT.from_wallet = 'interest' AND WT.to_wallet = 'token' THEN WT.amount_sent ELSE 0 END) AS interest_to_deposit,
    SUM(CASE WHEN WT.from_wallet = 'r&b' AND WT.to_wallet = 'token' THEN WT.amount_sent ELSE 0 END) AS rnb_to_deposit,
    SUM(CASE WHEN WT.from_wallet = 'roi' AND WT.to_wallet = 'token' THEN WT.amount_sent ELSE 0 END) AS roi_to_deposit
FROM intra_wallet_transaction_table WT
WHERE WT.userId = ?;



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

  getStats: () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(statsQuery, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results[0]); // Return the first result row
        });
      });
    });
  },

  calculateBusiness: async (userId, startDate, endDate) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        // SQL for the recursive CTE
        const sql = `
        WITH RECURSIVE UserTree AS (
          SELECT user_id, left_child, right_child 
          FROM binary_tree 
          WHERE user_id = ?
          
          UNION ALL
          
          SELECT bt.user_id, bt.left_child, bt.right_child 
          FROM binary_tree bt
          JOIN UserTree ut ON ut.left_child = bt.user_id OR ut.right_child = bt.user_id
        )
        
        SELECT 
          SUM(it.deposit_amount) AS cashBusiness,
          SUM(it.token_amount) AS tokenBusiness,
          (
            SELECT SUM(amount) 
            FROM withdrawal_table wt 
            WHERE wt.user_id IN (SELECT user_id FROM UserTree) AND wt.date BETWEEN ? AND ?
          ) AS withdrawals
        FROM investments_table it
        WHERE it.user_id IN (SELECT user_id FROM UserTree) and it.type='self' AND it.investment_date BETWEEN ? AND ?;
      `;

        connection.query(
          sql,
          [userId, startDate, endDate, startDate, endDate],
          (err, results) => {
            connection.release();

            if (err) {
              reject(err);
              return;
            }

            if (results && results.length > 0) {
              resolve(results[0]); // Assuming results[0] contains the aggregated values
            } else {
              resolve({
                cashBusiness: 0,
                tokenBusiness: 0,
                withdrawals: 0,
              });
            }
          }
        );
      });
    });
  },
  getAdminById: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = "SELECT * FROM admin_table WHERE id = ?";

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

  createAdmin: async (name, email, phone, password, security_pin) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const insertQuery =
          "INSERT INTO admin_table ( name, email, phone, password, security_pin) VALUES ( ?, ?, ?, ?, ?)";

        connection.query(
          insertQuery,
          [name, email, phone, password, security_pin],
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            const admin = {
              id: result.insertId,

              name,
              email,
              phone,
              password,
              security_pin,
            };
            resolve(admin);
          }
        );
      });
    });
  },

  updateAdmin: async (
    id,

    name,
    email,
    phone,
    password,
    security_pin
  ) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE admin_table SET  name = ?, email = ?, phone = ?, password = ?, security_pin = ? WHERE id = ?";

        connection.query(
          updateQuery,
          [name, email, phone, password, security_pin, id],
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            if (result.affectedRows > 0) {
              const admin = {
                id,

                name,
                email,
                phone,
                password,
                security_pin,
              };
              resolve(admin);
            } else {
              resolve(null);
            }
          }
        );
      });
    });
  },

  deleteAdmin: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const deleteQuery = "DELETE FROM admin_table WHERE id = ?";

        connection.query(deleteQuery, [id], (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          if (result.affectedRows > 0) {
            resolve({ id });
          } else {
            resolve(null);
          }
        });
      });
    });
  },
  verifyAdmin: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE admin_table SET isVerified = 1 WHERE id = ?";

        connection.query(updateQuery, [id], (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          if (result.affectedRows > 0) {
            resolve(result);
          } else {
            resolve(null);
          }
        });
      });
    });
  },
  getAdminByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = "SELECT * FROM admin_table WHERE email = ?";

        connection.query(selectQuery, [email], (err, results) => {
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
  // Service for admin_activated_packages

  createActivatedPackage: async (accountData) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const insertQuery =
          "INSERT INTO admin_activated_packages (user_id, packageid, amount, gateway, status, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(
          insertQuery,
          [
            accountData.user_id,
            accountData.package_id,
            accountData.amount,
            accountData.gateway,
            "complete",
            new Date(),
            new Date(),
          ],
          (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve(results.insertId);
          }
        );
      });
    });
  },
  getUsersWithActivePackages: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.error("Error in connection:", err);
          reject(err);
          return;
        }

        try {
          const query = `
          SELECT 
  u.userId, 
  u.name, 
  u.email, 
  u.country, 
  u.phone, 
  u.status, 
  date_format(u.createdAt  , '%Y-%m-%d') as createdAt,
  date_format(i.expires_on  , '%Y-%m-%d') as expires_on,
  date_format(i.investment_date  , '%Y-%m-%d') as investment_date,
  i.invested_amount AS amount, 

  p.package_name,
 DATEDIFF(CURDATE(), i.investment_date) -
  (WEEK(i.investment_date, 1) - WEEK(CURDATE(), 1)) * 2 - 
  (CASE WHEN DAYOFWEEK(i.investment_date) = 1 THEN 1 ELSE 0 END) - 
  (CASE WHEN DAYOFWEEK(i.investment_date) = 7 THEN 1 ELSE 0 END) -
  (CASE WHEN DAYOFWEEK(CURDATE()) = 1 THEN 1 ELSE 0 END) - 
  (CASE WHEN DAYOFWEEK(CURDATE()) = 7 THEN 1 ELSE 0 END) AS days_since_investment,
  p.duration,
  c.amount1, 
  c.amount2, 
  c.currency1, 
  c.currency2
FROM users_table u
JOIN investments_table i ON u.userId = i.user_id 
JOIN master_table_packages p ON i.package_id = p.package_id
LEFT JOIN coinpayments_transactions c ON i.txn_id = c.txn_id
WHERE u.status = 'active' AND p.status = 'Active'
ORDER BY DATE(i.investment_date) DESC;

          `;

          connection.query(query, (err, result) => {
            if (err) {
              console.error("Error in query:", err);
              reject(err);
              return;
            }
            resolve(result);
          });
        } catch (error) {
          console.error("Error:", error);
          reject(error);
        } finally {
          connection.release();
        }
      });
    });
  },
  getAllActivatedPackages: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
                SELECT transactionid, user_id, packageid, amount, gateway, status, 
                       DATE_FORMAT(created_date, '%Y-%m-%d') as created_date, 
                       DATE_FORMAT(updated_date, '%Y-%m-%d') as updated_date 
                FROM admin_activated_packages`;
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

  getActivatedPackageById: async (transactionid) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          "SELECT * FROM admin_activated_packages WHERE transactionid = ?",
          [transactionid],
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

  updateActivatedPackage: async (transactionid, accountData) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE admin_activated_packages SET user_id=?, packageid=?, amount=?, gateway=?, status=?, updated_date=? WHERE transactionid=?";
        connection.query(
          updateQuery,
          [
            accountData.user_id,
            accountData.packageid,
            accountData.amount,
            accountData.gateway,
            accountData.status,
            new Date(),
            transactionid,
          ],
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

  deleteActivatedPackage: async (transactionid) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          "DELETE FROM admin_activated_packages WHERE transactionid = ?",
          [transactionid],
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
};

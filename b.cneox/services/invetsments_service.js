const connectionPool = require("./db_service");
module.exports = {
  getInvestmentsByDateRange: async (startOfTimeRange, endOfTimeRange) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }
        const selectQuery = `
        SELECT 
    i.*,
    mp.capping_limit
FROM 
    investments_table i
LEFT JOIN 
    master_table_packages mp ON i.package_id = mp.package_id
LEFT JOIN (
    SELECT 
        user_id,
        MAX(package_id) AS highest_package
    FROM 
        investments_table 
    GROUP BY 
        user_id
) AS sub ON i.user_id = sub.user_id AND i.package_id = sub.highest_package
WHERE 
    i.is_binary_updated = 0;

        `;
        //removed
        /*WHERE 
    i.investment_date BETWEEN ? AND ? 
    AND i.is_binary_updated = 0;*/
        connection.query(
          selectQuery,
          // [startOfTimeRange, endOfTimeRange],
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
  // Assuming you have the necessary connection setup in place
  updateSuspendedUsers: () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        // First, we'll fetch the necessary data for suspended users with pending status in free_accounts
        const fetchQuery = `
        SELECT u.userId, f.target_type, f.target_amount, w.direct_business, 
          b.left_business, b.right_business, f.transactionId
        FROM users_table u
        JOIN free_accounts f ON u.userId = f.user_id
        LEFT JOIN wallets_table w ON u.userId = w.userId
        LEFT JOIN binary_tree b ON u.userId = b.user_id
        WHERE u.status = 'suspended' AND f.status = 'pending'
        ORDER BY f.created_date DESC;
      `;

        connection.query(fetchQuery, [], (err, results) => {
          if (err) {
            connection.release();
            reject(err);
            return;
          }
          // Process each suspended user entry
          const promises = results.map((user) => {
            return new Promise((resolveUpdate, rejectUpdate) => {
              if (
                (user.target_type === "direct" &&
                  Number(user.direct_business) >= Number(user.target_amount)) ||
                (user.target_type === "tree" &&
                  Number(user.target_amount) < Number(user.left_business) &&
                  Number(user.target_amount) < Number(user.right_business))
              ) {
                // Update the user status
                connection.query(
                  "UPDATE users_table SET status = 'active' WHERE userId = ?",
                  [user.userId],
                  (err, userUpdateResult) => {
                    if (err) {
                      rejectUpdate(err);
                    } else {
                      // Update the free_accounts status
                      connection.query(
                        "UPDATE free_accounts SET status = 'complete' WHERE transactionid = ? AND status = 'pending'",
                        [user.transactionId],
                        (err, accountsUpdateResult) => {
                          if (err) {
                            rejectUpdate(err);
                          } else {
                            resolveUpdate(`User ${user.userId} updated.`);
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                resolveUpdate("No updates necessary.");
              }
            });
          });

          // Execute all update promises
          Promise.all(promises)
            .then(() => {
              connection.release();
              resolve("All updates completed.");
            })
            .catch((updateErr) => {
              connection.release();
              reject(updateErr);
            });
        });
      });
    });
  },
  getAllInvestments: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `
              SELECT
    i.investment_id,u.name,u.email,u.country,
    i.txn_id,
    i.crypto_type,
    i.user_id,
    i.sponsor,
    i.package_id,
    i.invested_amount,
    i.deposit_amount,
    i.token_amount,
    CONCAT(UCASE(LEFT(i.type, 1)), SUBSTRING(i.type, 2)) AS type,
    i.voucher_id,
    DATE_FORMAT(i.investment_date, '%Y-%m-%d') AS investment_date,
    DATE_FORMAT(i.expires_on, '%Y-%m-%d') AS expires_on,
    p.package_name,
    p.duration
FROM
    investments_table i
JOIN
    master_table_packages p ON i.package_id = p.package_id
    join
    users_table u ON i.user_id = u.userId
    order by i.investment_date desc

          
          `;
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

  getDownlineInvestmentsByUserId: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `
            SELECT
    i.investment_id,
    i.txn_id,
    i.crypto_type,
    i.user_id,
    i.sponsor,
    i.package_id,
    i.invested_amount,
    i.deposit_amount,
    i.token_amount,
    CONCAT(UCASE(LEFT(i.type, 1)), SUBSTRING(i.type, 2)) AS type,
    DATE_FORMAT(i.investment_date, '%Y-%m-%d') AS investment_date,
    DATE_FORMAT(i.expires_on, '%Y-%m-%d') AS expires_on,
    p.package_name,
    p.duration
FROM
    investments_table i
JOIN
    master_table_packages p ON i.package_id = p.package_id
WHERE
    i.sponsor = ?;

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
  getRecentInvestments: async (limit) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `
            SELECT
    i.investment_id,
    i.txn_id,
    i.crypto_type,
    i.user_id,u.name,u.country,u.email,
    i.sponsor,
    i.package_id,
    i.invested_amount,
    i.deposit_amount,
    i.token_amount,
    CONCAT(UCASE(LEFT(i.type, 1)), SUBSTRING(i.type, 2)) AS type,
    DATE_FORMAT(i.investment_date, '%Y-%m-%d') AS investment_date,
    DATE_FORMAT(i.expires_on, '%Y-%m-%d') AS expires_on,
    p.package_name,
    p.duration
FROM
    investments_table i
JOIN
    master_table_packages p ON i.package_id = p.package_id  join
    users_table u ON i.user_id = u.userId
oRDER BY i.investment_id DESC
limit ?

          `;
        connection.query(query, [limit], (err, results) => {
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
  getInvestmentsByPackage: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `
           SELECT
    p.package_id,
    p.package_name,
    COUNT(i.investment_id) AS investment_count,
    ROUND((COUNT(i.investment_id) / (SELECT COUNT(*) FROM investments_table)) * 100, 2) AS percentage
FROM
    master_table_packages p
LEFT JOIN
    investments_table i ON p.package_id = i.package_id
GROUP BY
    p.package_id, p.package_name;


          `;
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
  getInvestmentById: async (investmentId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query =
          "SELECT investment_id, txn_id, user_id, sponsor, package_id, invested_amount, DATE_FORMAT(investment_date, '%Y-%m-%d') AS investment_date, DATE_FORMAT(expires_on, '%Y-%m-%d') AS expires_on, deposit_amount, token_amount ,type FROM investments_table WHERE investment_id = ?";
        connection.query(query, [investmentId], (err, results) => {
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

  getInvestmentsByUserId: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `
           SELECT
    i.investment_id,
    i.txn_id,
    i.crypto_type,
    i.user_id,
    i.sponsor,
    i.package_id,
    i.invested_amount,
    i.deposit_amount,
    i.token_amount,
    CONCAT(UCASE(LEFT(i.type, 1)), SUBSTRING(i.type, 2)) AS type,
    DATE_FORMAT(i.investment_date, '%Y-%m-%d') AS investment_date,
    DATE_FORMAT(i.expires_on, '%Y-%m-%d') AS expires_on,
    p.package_name,
    p.duration
FROM
    investments_table i
JOIN
    master_table_packages p ON i.package_id = p.package_id
WHERE
    i.user_id = ?;
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

  createInvestment: async (
    txn_id,
    user_id,
    sponsor,
    package_id,
    invested_amount,
    investment_date,
    expires_on,
    deposit_amount,
    token_amount,
    type,
    crypto_type,
    voucher_id
  ) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query =
          "INSERT INTO investments_table (txn_id, user_id, sponsor, package_id, invested_amount, investment_date, expires_on, deposit_amount,token_amount,type,crypto_type,voucher_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
        const values = [
          txn_id,
          user_id,
          sponsor,
          package_id,
          invested_amount,
          investment_date,
          expires_on,
          deposit_amount,
          token_amount,
          type,
          crypto_type,
          voucher_id,
        ];

        connection.query(query, values, (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          const investmentId = result.insertId;
          const investment = {
            investment_id: investmentId,
            user_id,
            sponsor,
            package_id,
            invested_amount,
            investment_date,
            expires_on,
            deposit_amount,
            token_amount,
            type,
            crypto_type,
          };
          resolve(investment);
        });
      });
    });
  },
  updateInvestmentBinarystatus: async (investment_id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE investments_table SET is_binary_updated = 1 WHERE investment_id = ?";

        connection.query(updateQuery, [investment_id], (err, results) => {
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

  getInvestmentByTxnId: async (txn_id) => {
    return new Promise((res, rej) => {
      const selectQuery = "SELECT * FROM investments_table WHERE txn_id = ? ";
      connectionPool.getConnection((err, connection) => {
        if (err) {
          rej(err);
          return;
        }
        connection.query(selectQuery, [txn_id], (err, results) => {
          connection.release();
          if (err) {
            rej(err);
            return;
          }
          res(results[0]);
        });
      });
    });
  },
};

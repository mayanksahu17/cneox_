const connectionPool = require("./db_service");

module.exports = {
  //insert wallet entry
  insertWalletEntry: async (walletData) => {
    const {
      userId,
      depositWallet,
      roiWallet,
      referralWallet,
      binaryWallet,
      totalEarning,
      totalInvestment,
      totalWithdrawal,
      leftLevel1Earning,
      rightLevel1Earning,
      token_wallet,
      interest_wallet,
      referral_binary_wallet,
      total_deposit,
    } = walletData;

    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query = `INSERT INTO wallets_table (userId, deposit_wallet, roi_wallet, referral_wallet, binary_wallet, total_earning, total_investment, total_withdrawal, left_level_1_earning, right_level_1_earning, token_wallet,
      interest_wallet,
      referral_binary_wallet,
      total_deposit) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)`;
        const values = [
          userId,
          depositWallet,
          roiWallet,
          referralWallet,
          binaryWallet,
          totalEarning,
          totalInvestment,
          totalWithdrawal,
          leftLevel1Earning,
          rightLevel1Earning,
          token_wallet,
          interest_wallet,
          referral_binary_wallet,
          total_deposit,
        ];

        connection.query(query, values, (err, result) => {
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
  interWalletTransfer: async ({
    txn_id,
    fromUserId,
    toUserId,
    from_wallet,
    to_wallet,
    amount,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery =
          "INSERT INTO inter_wallet_transaction_table (txn_id, fromUserId,toUserId,from_wallet,to_wallet, txn_time, amount) VALUES (?,?,?,?,?,NOW(),?)";

        connection.query(
          selectQuery,
          [txn_id, fromUserId, toUserId, from_wallet, to_wallet, amount],
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
  getAllInterWalletTransfer: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery =
          "SELECT txn_id, fromUserId,toUserId, DATE_FORMAT(txn_time, '%Y-%m-%d') AS txn_date, amount,   status FROM inter_wallet_transaction_table";

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

  getAllWalletsByUserId: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
          SELECT
                    wt.*,
                    bt.left_business,
                    bt.left_downlines,
                    bt.right_business,
                    bt.right_downlines,
                    ut.userId,
                    ut.name,
                    (SELECT COUNT(*) FROM referrals_table WHERE referrer_id = ? AND parent_id = 1) as level_1_referrals
                FROM wallets_table wt
                LEFT JOIN binary_tree bt ON wt.userId = bt.user_id
                LEFT JOIN users_table ut ON wt.userId = ut.userId
                WHERE wt.userId = ?;
        
        `;

        connection.query(selectQuery, [userId, userId], (err, results) => {
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

  updateRoiWallet: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery = `
          UPDATE wallets_table 
          SET 
            roi_wallet = IFNULL(roi_wallet, 0) + ?,
            total_earning = IFNULL(total_earning, 0) + CASE WHEN ? > 0 THEN ? ELSE 0 END
          WHERE userId = ?
        `;
        connection.query(
          updateQuery,
          [amount, amount, amount, userId],
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          }
        );
      });
    });
  },
  updateTotalTokenGenerated: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery = `
          UPDATE wallets_table 
          SET 
            toal_voucher_generated = IFNULL(toal_voucher_generated, 0) + ?
          WHERE userId = ?
        `;
        connection.query(updateQuery, [amount, userId], (err, result) => {
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

  updateReferralBinaryWallet: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery = `
          UPDATE wallets_table 
          SET 
            referral_binary_wallet = IFNULL(referral_binary_wallet, 0) + ?,
            total_earning = IFNULL(total_earning, 0) + CASE WHEN ? > 0 THEN ? ELSE 0 END
          WHERE userId = ?
        `;
        connection.query(
          updateQuery,
          [amount, amount, amount, userId],
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          }
        );
      });
    });
  },

  updateTokenWallet: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery = `
          UPDATE wallets_table 
          SET 
            total_earning = IFNULL(total_earning, 0) + CASE WHEN ? > 0 THEN ? ELSE 0 END,
            token_wallet = IFNULL(token_wallet, 0) + ?
          WHERE userId = ?
        `;

        connection.query(
          updateQuery,
          [amount, amount, amount, userId],
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          }
        );
      });
    });
  },
  transferToTokenWallet: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery = `
          UPDATE wallets_table 
          SET 
           
            token_wallet = IFNULL(token_wallet, 0) + ?
          WHERE userId = ?
        `;

        connection.query(updateQuery, [amount, userId], (err, result) => {
          connection.release();
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });
  },
  updateInterestWallet: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery = `
          UPDATE wallets_table 
          SET 
            interest_wallet = IFNULL(interest_wallet, 0) + ?,
            total_earning = IFNULL(total_earning, 0) + CASE WHEN ? > 0 THEN ? ELSE 0 END
          WHERE userId = ?
        `;
        connection.query(
          updateQuery,
          [amount, amount, amount, userId],
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          }
        );
      });
    });
  },
  processMonthlyCareerIncome: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
          SELECT userId, direct_business 
          FROM wallets_table
          WHERE direct_business >= 10000
        `;

        connection.query(selectQuery, async (err, results) => {
          if (err) {
            connection.release();
            reject(err);
            return;
          }

          for (const row of results) {
            let amount = 0;
            if (row.direct_business >= 10000) {
              amount = 300;
            }
            if (row.direct_business >= 25000) {
              amount = 700;
            }
            if (row.direct_business >= 50000) {
              amount = 1500;
            }
            if (row.direct_business >= 100000) {
              amount = 3500;
            }

            try {
              await module.exports.updateInterestWallet(row.userId, amount);
              console.log(
                `Updated interest wallet for user ${row.userId} with amount ${amount}`
              );
            } catch (updateErr) {
              console.error(
                `Failed to update interest wallet for user ${row.userId}:`,
                updateErr
              );
            }
          }

          connection.release();
          resolve();
        });
      });
    });
  },
  updateReferralWallet: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery = `
          UPDATE wallets_table 
          SET 
            referral_wallet = IFNULL(referral_wallet, 0) + ?
          WHERE userId = ?
        `;

        connection.query(updateQuery, [amount, userId], (err, result) => {
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
  updateDirectBusinessWallet: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery = `
          UPDATE wallets_table 
          SET 
            direct_business = IFNULL(direct_business, 0) + ?
          WHERE userId = ?
        `;

        connection.query(updateQuery, [amount, userId], (err, result) => {
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

  updateBinaryWallet: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery = `
          UPDATE wallets_table 
          SET 
            binary_wallet = IFNULL(binary_wallet, 0) + ?
          WHERE userId = ?
        `;

        connection.query(updateQuery, [amount, userId], (err, result) => {
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

  updateTotalEarning: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE wallets_table SET total_earning = IFNULL(total_earning, 0) + ? WHERE userId = ?";

        connection.query(updateQuery, [amount, userId], (err, result) => {
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
  updateTotalDeposit: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE wallets_table SET total_deposit = IFNULL(total_deposit, 0) + ? WHERE userId = ?";

        connection.query(updateQuery, [amount, userId], (err, result) => {
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

  updateTotalInvestment: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE wallets_table SET total_investment = IFNULL(total_investment, 0) + ? WHERE userId = ?";

        connection.query(updateQuery, [amount, userId], (err, result) => {
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
  getBioWallets: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
            SELECT
    W.roi_wallet,
    W.referral_binary_wallet,
    W.interest_wallet,
    W.referral_wallet,
    W.binary_wallet,
    W.total_earning,
    W.total_deposit,
    W.total_withdrawal,
    W.total_investment,
    W.toal_voucher_generated,
    W.total_voucher_investment,
    W.direct_business
FROM wallets_table W
WHERE W.userId = ?;

          `;
        connection.query(selectQuery, id, (err, results) => {
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
  updateTotalVoucherInvestment: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE wallets_table SET total_voucher_investment = IFNULL(total_voucher_investment, 0) + ? WHERE userId = ?";

        connection.query(updateQuery, [amount, userId], (err, result) => {
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
  getWithdrawalAddressByUserId: async ({ userId }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT withdrawal_wallet FROM wallets_table WHERE userId = ? ";

        connection.query(selectQuery, [userId], (err, results) => {
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

  updateWithdrawalWallet: async (userId, withdrawal_wallet) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE wallets_table SET withdrawal_wallet =? WHERE userId = ?";

        connection.query(
          updateQuery,
          [withdrawal_wallet, userId],
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          }
        );
      });
    });
  },

  updateTotalWithdrawal: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE wallets_table SET total_withdrawal = IFNULL(total_withdrawal, 0) + ? WHERE userId = ?";

        connection.query(updateQuery, [amount, userId], (err, result) => {
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

  updateLeftLevel1Earning: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE wallets_table SET left_level_1_earning = IFNULL(left_level_1_earning, 0) + ? WHERE userId = ?";

        connection.query(updateQuery, [amount, userId], (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          const selectQuery = "SELECT * FROM wallets_table WHERE userId = ?";

          connection.query(selectQuery, [userId], (err, updatedResult) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }

            resolve(updatedResult[0]);
          });
        });
      });
    });
  },

  updateRightLevel1Earning: async (userId, amount) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE wallets_table SET right_level_1_earning = IFNULL(right_level_1_earning, 0) + ? WHERE userId = ?";

        connection.query(updateQuery, [amount, userId], (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }

          const selectQuery = "SELECT * FROM wallets_table WHERE userId = ?";

          connection.query(selectQuery, [userId], (err, updatedResult) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }

            resolve(updatedResult[0]);
          });
        });
      });
    });
  },
};
// CREATE TABLE `inter_wallet_transaction_table` (
// 	`txn_id` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
// 	`fromUserId` VARCHAR(12) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
// 	`toUserId` VARCHAR(12) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
// 	`txn_time` DATETIME NULL DEFAULT NULL,
// 	`amount` DECIMAL(20,6) NULL DEFAULT NULL,
// 	`status` ENUM('pending','completed','cancelled') NULL DEFAULT 'pending' COLLATE 'utf8mb4_0900_ai_ci',
// 	`from_wallet` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
// 	`to_wallet` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
// 	PRIMARY KEY (`txn_id`) USING BTREE,
// 	INDEX `idx_from_user` (`fromUserId`) USING BTREE
// )
// COLLATE='utf8mb4_0900_ai_ci'
// ENGINE=InnoDB
// ;

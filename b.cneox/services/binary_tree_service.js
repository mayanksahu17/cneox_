const { createBinaryTransaction } = require("./binary_transaction_service");
const connectionPool = require("./db_service");
const {
  updateBinaryWallet,
  updateReferralBinaryWallet,
} = require("./wallets_service");
const {
  sendNotificationToUser,
  sendNotificationToAdmin,
} = require("../utils/notifications");
const { getUKDate } = require("../utils/date");
const notificationService = require("./notifications_service");
module.exports = {
  getCappingLimitOfUser: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const currentDate = new Date().toISOString().slice(0, 10); // Formats current date as YYYY-MM-DD

        // This query checks if there's a valid investment for the user which hasn't expired.
        // If so, it fetches the capping_limit from the master_table_packages for that package.
        // If not, it returns a capping_limit of 1000.00 by default.
        const query = `
          SELECT 
            IFNULL(mp.capping_limit, 1000.00) AS capping_limit
          FROM investments_table it
          LEFT JOIN master_table_packages mp ON it.package_id = mp.package_id
          WHERE it.user_id = ? AND it.expires_on >= CURDATE()
          ORDER BY it.package_id DESC
          LIMIT 1
        `;

        connection.query(query, [userId], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }

          // If there are results, we return the capping_limit from the first result (as we limited the results to 1).
          // Otherwise, we default to 1000.
          const cappingLimit =
            results.length > 0 ? results[0].capping_limit : 1000.0;
          resolve(cappingLimit);
        });
      });
    });
  },

  // NOTE: You will also need a function called 'generateNextAdminId()'
  // to generate the next available admin ID in the sequence from 'CROWN-AAAAAA' to 'CROWN-AZZZZZ'.
  getBinaryTreeEntryByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const query = "SELECT * FROM binary_tree WHERE user_id = ?";

        connection.query(query, [userId], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results[0] || null);
        });
      });
    });
  },
  processBinaryTransactions: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;
        console.log("binary transaction started");

        try {
          const usersQuery =
            "SELECT user_id, binary_due, actual_due FROM binary_tree WHERE binary_due > 0 OR actual_due > 0";
          const usersToUpdate = await new Promise((resolve, reject) => {
            connection.query(usersQuery, (error, results) => {
              if (error) {
                reject(error);
                return;
              }
              resolve(results);
            });
          });

          for (let entry of usersToUpdate) {
            if (entry.user_id !== "CROWN-000000") {
              const capping_limit = await module.exports.getCappingLimitOfUser(
                entry?.user_id
              );
              const binaryBonus = Math.min(capping_limit, entry.binary_due); // Or calculate based on your business logic
              await createBinaryTransaction(
                entry?.user_id,
                // package_id,
                binaryBonus,
                new Date(),
                // givenUser,
                // investment_id,
                // position,
                capping_limit
              );
              // Update the wallets using your provided walletService methods
              await updateBinaryWallet(entry.user_id, binaryBonus);
              await updateReferralBinaryWallet(entry.user_id, binaryBonus);

              // Set binary_due and actual_due to 0 for the user in binary_tree
              const updateBinaryTreeQuery =
                "UPDATE binary_tree SET binary_due = 0, actual_due = 0,matching_due=0 WHERE user_id = ?";
              await new Promise((resolve, reject) => {
                connection.query(
                  updateBinaryTreeQuery,
                  [entry.user_id],
                  (error) => {
                    if (error) {
                      reject(error);
                      return;
                    }
                    resolve();
                  }
                );
              });
              await notificationService.createNotification(
                entry.user_id,
                "user",
                `Congrats! binary bonus worth $${binaryBonus} credited in R&B wallet `,
                "binary"
              );
              await notificationService.createNotification(
                null,
                "admin",
                `Binary credited on ${getUKDate()}`,
                "binary"
              );
            }

            connection.release();
            resolve();
          }
        } catch (error) {
          console.log(error, "error in binary service");
          connection.release();
          reject(error);
        } finally {
          console.log("binary transaction completed");
        }
      });
    });
  },
  updateBinaryTreeEntry: (entry) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const query = `
          UPDATE binary_tree 
          SET parent_id = ?, left_child = ?, right_child = ?, left_business = ?, 
              right_business = ?, left_carry = ?, right_carry = ? ,binary_due=?,actual_due=?,matching_due=?,capping_limit=?
          WHERE user_id = ?`;

        const values = [
          entry.parent_id,
          entry.left_child,
          entry.right_child,
          entry.left_business,
          entry.right_business,
          entry.left_carry,
          entry.right_carry,
          entry.binary_due,
          entry.actual_due,
          entry.matching_due,
          entry.capping_limit,
          entry.user_id,
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
};

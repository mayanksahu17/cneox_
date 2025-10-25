const connectionPool = require("./db_service");

module.exports = {
  createBinaryTransaction: async (
    user_id,
    // package_id,
    amount,
    date,
    // referral_user_id,
    // investment_id,
    // position,
    capping_limit
  ) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const insertQuery =
          "INSERT INTO binary_transaction_table (user_id, amount, date,daily_capping_limit,status) VALUES ( ?, ?, ?,?,'Completed')";

        connection.query(
          insertQuery,
          [
            user_id,
            // package_id,
            amount,
            date,
            // referral_user_id,
            // investment_id,
            // position,
            capping_limit,
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

  getAllBinaryTransactions: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `SELECT b.id, b.user_id, b.amount,u.email,u.name,u.country, 
          DATE_FORMAT(b.date, '%Y-%m-%d') AS date ,b.daily_capping_limit, 
          b.status 
          FROM binary_transaction_table b join users_table u on u.userId =b.user_id 
 order by id desc`;

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

  getBinaryTransactionsByUserId: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query =
          "SELECT id, user_id, amount, DATE_FORMAT(date, '%Y-%m-%d') AS date,daily_capping_limit,status FROM binary_transaction_table WHERE user_id = ?;";

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
};

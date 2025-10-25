const connectionPool = require("./db_service");

module.exports = {
  createReferralTransaction: async (
    user_id,
    package_id,
    amount,
    date,
    referral_user_id,
    investment_id
  ) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query =
          "INSERT INTO referral_transaction_table (user_id, package_id, amount, date, referral_user_id, investment_id) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [
          user_id,
          package_id,
          amount,
          date,
          referral_user_id,
          investment_id,
        ];

        connection.query(query, values, (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          const referralTransactionId = result.insertId;
          const referralTransaction = {
            id: referralTransactionId,
            user_id,
            package_id,
            amount,
            date,
            referral_user_id,
            investment_id,
          };
          resolve(referralTransaction);
        });
      });
    });
  },
  getReferralTransactionsByUserId: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT id, user_id, package_id, amount, DATE_FORMAT(date, '%Y-%m-%d') AS date, referral_user_id, investment_id FROM referral_transaction_table WHERE user_id = ?;";

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

  getAllReferralTransactions: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
          SELECT 
          r.id, 
          r.user_id, u.name,u.email,u.country,
          r.package_id, 
          r.amount, 
          DATE_FORMAT(r.date, '%Y-%m-%d') AS date, 
          r.referral_user_id, 
          r.investment_id,
          r.percentage,
          p.package_name
          FROM  
            referral_transaction_table r 
           join master_table_packages p 
            on p.package_id=r.package_id
            join users_table u on u.userId =r.user_id  
            order by r.id desc;
          
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
};

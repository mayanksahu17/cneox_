const connectionPool = require("./db_service");

module.exports = {
  getTransactionById: async (transactionId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `SELECT 
    transactionid, 
    user_id, 
    packageid, 
    amount, target_amount,
    gateway, 
    status,investment_id, 
    DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date, 
    admin,target_type,roi_type,
    DATE_FORMAT(updated_date, '%Y-%m-%d') AS updated_date
FROM 
    free_accounts where transactionId= ?
`;

        connection.query(selectQuery, [transactionId], (err, results) => {
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

  updateTransaction: async (transactionId, data) => {
    const updated_date = new Date();
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery = `
          UPDATE free_accounts 
          SET user_id = ?, packageid = ?, amount = ?, target_amount=?,gateway = ?, status = ?,admin=?,updated_date=?,target_type=?,roi_type=?
          WHERE transactionid = ?`;

        connection.query(
          updateQuery,
          [
            data.userId,
            data.packageId,
            data.amount,
            data.target_amount,
            data.gateway,
            data.status,
            data.admin,
            updated_date,
            data.target_type,
            data.roi_type,
            transactionId,
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

  deleteTransaction: async (transactionId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const deleteQuery = "DELETE FROM free_accounts WHERE transactionid = ?";

        connection.query(deleteQuery, [transactionId], (err, results) => {
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
  createTransaction: async ({
    user_id,
    package_id,
    amount,
    target_amount,
    gateway,
    status,
    target_type,
    roi_type,
    admin,
    investment_id,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const insertQuery = `
          INSERT INTO free_accounts (user_id, packageid, amount,target_amount, gateway, status, target_type,roi_type,admin,investment_id,created_date,updated_date) 
          VALUES (?, ?, ?,?, ?,?,?, ?,?,?,CURDATE(),CURDATE())`;

        connection.query(
          insertQuery,
          [
            user_id,
            package_id,
            amount,
            target_amount,
            gateway,
            status,
            target_type,
            roi_type,
            admin,
            investment_id,
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

  getAllTransactions: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `SELECT 
    f.transactionid, 
    f.user_id,u.name,u.email,u.country, 
    f.packageid, 
    f.amount, f.target_amount,
    f.gateway, 
    f.status, f.investment_id,
    DATE_FORMAT(f.created_date, '%Y-%m-%d') AS created_date, 
    f.admin,f.target_type,f.roi_type,
    DATE_FORMAT(f.updated_date, '%Y-%m-%d') AS updated_date
FROM 
    free_accounts f 
    left join users_table u on u.userId=f.user_id;
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
  checkFreeAccount: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) reject(err);

        const query = `  SELECT COUNT(*) AS count 
        FROM free_accounts 
        WHERE user_id = ? AND status != 'completed'`;
        connection.query(query, [userId], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(results[0]?.count > 0); // Returns true if user has a free account
          }
        });
      });
    });
  },
};

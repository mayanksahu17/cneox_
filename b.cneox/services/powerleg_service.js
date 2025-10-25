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
    amount, 
    gateway, 
    status, 
    DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date, 
    admin,
    DATE_FORMAT(updated_date, '%Y-%m-%d') AS updated_date
FROM 
    powerleg_accounts where transactionId= ?
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
          UPDATE powerleg_accounts 
          SET user_id = ?, packageid = ?, amount = ?, gateway = ?, status = ?,admin=?,updated_date=?
          WHERE transactionid = ?`;

        connection.query(
          updateQuery,
          [
            data.userId,
            data.packageId,
            data.amount,
            data.gateway,
            data.status,
            data.admin,
            updated_date,
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
        const deleteQuery =
          "DELETE FROM powerleg_accounts WHERE transactionid = ?";

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
    gateway,
    status,
    admin,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const insertQuery = `
          INSERT INTO powerleg_accounts (user_id, packageid, amount, gateway, status, admin,created_date,updated_date) 
          VALUES (?, ?, ?, ?, ?,?,CURDATE(),CURDATE())`;

        connection.query(
          insertQuery,
          [user_id, package_id, amount, gateway, status, admin],
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
    f.amount, 
    f.gateway, 
    f.status, 
    DATE_FORMAT(f.created_date, '%Y-%m-%d') AS created_date, 
    f.admin,
    DATE_FORMAT(f.updated_date, '%Y-%m-%d') AS updated_date
FROM 
    powerleg_accounts f
    left join users_table u on u.userId=f.user_id order by f.created_date desc

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

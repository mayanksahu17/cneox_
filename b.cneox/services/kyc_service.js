const connectionPool = require("./db_service");

module.exports = {
  updateKYCStatus: async ({
    id,

    status,

    updated_date,
  }) => {
    console.log(id, status);
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        const query = `
         UPDATE kyc SET  status = ? ,updated_date=? WHERE id = ?
        `;
        const values = [status, updated_date, id];
        connection.query(query, values, (err, result) => {
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
  createQuery: async ({
    full_name,
    message_text,
    phone,
    email,
    company_name,
    inquiry_date,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const insertQuery =
          "INSERT INTO queries (full_name, message_text, phone, email, company_name,inquiry_date) VALUES (?, ?, ?, ?, ?,?)";

        connection.query(
          insertQuery,
          [full_name, message_text, phone, email, company_name, inquiry_date],
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

  getAllQueries: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT id,full_name,message_text,phone,email,company_name ,DATE_FORMAT(inquiry_date, '%Y-%m-%d') as inquiry_date FROM queries";

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
  createKYC: async ({ userId, doctype, doclink, status, created_date }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const insertQuery =
          "INSERT INTO kyc (user_id, doctype, doclink, status,created_date) VALUES (?, ?, ?,?, ?)";
        connection.query(
          insertQuery,
          [userId, doctype, doclink, status, created_date],
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

  getKYC: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = "SELECT * FROM kyc WHERE user_id = ?";
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
  getKYCById: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = "SELECT * FROM kyc WHERE id = ?";
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
  getAllPendingKYC: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
        SELECT 
    id,
    user_id,
    doctype,
    doclink,
    DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date,
    DATE_FORMAT(updated_date, '%Y-%m-%d') AS updated_date,
    status
FROM 
    kyc
WHERE 
    status = 'pending';

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
  getAllKYC: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
        SELECT 
    k.id,
    k.user_id,u.name,u.email,u.country,
    k.doctype,
    k.doclink,
    DATE_FORMAT(k.created_date, '%Y-%m-%d') AS created_date,
    DATE_FORMAT(k.updated_date, '%Y-%m-%d') AS updated_date,
    k.status
FROM 
    kyc k join users_table u on u.userId=k.user_id order by k.created_date desc


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
  getAllReport: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
       SELECT 
    TradeId,
    DATE_FORMAT(TradeDate, '%Y-%m-%d') AS TradeDate,
    Pair,
  BuyingPrice,
 OpenPrice,
 HighPrice,
LowPrice,
 SellingPrice,
 Volume,
 ProfitLoss,
ProfitPercent
FROM 
    tradedata;


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
  getAllForexChartReport: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
                SELECT 
                    id AS pk_id,
                    DATE_FORMAT(Date, '%Y-%m-%d') AS Date,
                    Pair,
                    Price,
                    Lots,
                    Open_Price AS OpenPrice,
                    High_Price AS HighPrice,
                    Low_Price AS LowPrice,
                    Pips,
                    Profit_USD AS Profit
                FROM 
                    forex_chart;
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
  updateKYC: async (userId, doctype, doclink, status, id, updated_date) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE kyc SET doctype = ?, doclink = ?, status = ? ,updated_date=? WHERE id = ?";
        connection.query(
          updateQuery,
          [doctype, doclink, status, updated_date, id],
          (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve(results.affectedRows);
          }
        );
      });
    });
  },

  deleteKYC: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const deleteQuery = "DELETE FROM kyc WHERE user_id = ?";
        connection.query(deleteQuery, [userId], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results.affectedRows);
        });
      });
    });
  },
};

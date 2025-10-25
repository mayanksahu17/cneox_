const connectionPool = require("./db_service");

module.exports = {
  getAllVouchers: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
          SELECT
    v.voucher_id,
    v.userId as user_id,u.name,u.country,u.email,
    v.original_amount,
    v.created_by,
    CASE
        WHEN v.from_wallet = 'rnb' THEN 'Referral and Binary'
        WHEN v.from_wallet = 'roi' THEN 'ROI'
        WHEN v.from_wallet = 'interest' THEN 'Interest'
        ELSE v.from_wallet
    END AS from_wallet,
    v.amount,
    DATE_FORMAT(v.created_on, '%Y-%m-%d') AS created_on,
   CONCAT(UPPER(SUBSTRING(v.status, 1, 1)), LOWER(SUBSTRING(v.status, 2))) AS status
FROM
    vouchers_table v
    join users_table u on u.userId=v.userId
    order by v.created_on desc
    ;

          `;
        connection.query(selectQuery, (err, results) => {
          connection.release();
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve(results);
        });
      });
    });
  },
  getAllAdminVouchers: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
          SELECT
    v.voucher_id,
    v.userId as user_id,u.name,u.country,u.email,
    v.original_amount,
    v.created_by,
    CASE
        WHEN v.from_wallet = 'rnb' THEN 'Referral and Binary'
        WHEN v.from_wallet = 'roi' THEN 'ROI'
        WHEN v.from_wallet = 'interest' THEN 'Interest'
        ELSE v.from_wallet
    END AS from_wallet,
    v.amount,
    DATE_FORMAT(v.created_on, '%Y-%m-%d') AS created_on,
   CONCAT(UPPER(SUBSTRING(v.status, 1, 1)), LOWER(SUBSTRING(v.status, 2))) AS status
FROM
    vouchers_table v
    join users_table u on u.userId=v.userId
    where v.created_by='admin'
    order by v.created_on desc

    ;

          `;
        connection.query(selectQuery, (err, results) => {
          connection.release();
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve(results);
        });
      });
    });
  },

  getAllVouchersById: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = "SELECT * FROM vouchers_table WHERE userId = ?";

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
  getVoucherByVoucherId: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = "SELECT * FROM vouchers_table WHERE voucher_id = ?";

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

  getAllActiveVouchersById: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT * FROM vouchers_table WHERE userId = ? AND status='active'";

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
  getVouchersByWallets: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `

        SELECT 
    userId,
    SUM(CASE WHEN from_wallet = 'roi' THEN original_amount ELSE 0 END) AS roi_generated_voucher,
    SUM(CASE WHEN from_wallet = 'rnb' THEN original_amount ELSE 0 END) AS rnb_generated_voucher,
    SUM(CASE WHEN from_wallet = 'interest' THEN original_amount ELSE 0 END) AS interest_generated_voucher
FROM 
    vouchers_table
WHERE 
    userId = 'CROWN-100000'
GROUP BY 
    userId;

`;
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

  createVoucher: async ({ userId, voucherId, wallet, amount, created_by }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        const insertQuery =
          "INSERT INTO vouchers_table (voucher_id, userId, from_wallet, amount, created_on,original_amount,created_by) VALUES (?, ?, ? ,?, NOW(),?,?)";

        connection.query(
          insertQuery,
          [voucherId, userId, wallet, amount, amount, created_by],
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

  updateVoucherStatus: async ({ voucher_id, newStatus, newAmount }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE vouchers_table SET status = ? ,amount =  ? ,used_on=NOW() WHERE voucher_id = ?";

        connection.query(
          updateQuery,
          [newStatus, newAmount, voucher_id],
          (err, results) => {
            connection.release();
            if (err) {
              console.log(err);
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

const Coinpayments = require("coinpayments");
const connectionPool = require("./db_service");

const publicKey =
  "6a93afda50ecc8aa8bac33f566c96fb74f49688d8b479031e982715b5ae8cb6e";
const privateKey =
  "74ba70Eb6b1041118232e5CE8feA00DEc91539e4d822b21f93b5b9ca2a70350A";

const credentials = {
  key: publicKey,
  secret: privateKey,
};

const client = new Coinpayments(credentials);

module.exports = {
  getAllWithdrawalsByUserId: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const query = `
     SELECT 
    txn_id,
    user_id,withdrawal_id,
    DATE_FORMAT(date, '%Y-%m-%d') as date,
    amount,
    CASE WHEN status IN ('pending', 'rejected') THEN NULL ELSE charges END AS charges,
    crypto_type,
    UPPER(wallet_type) AS wallet_type,
    UPPER(status) as status,
    DATE_FORMAT(txn_date, '%Y-%m-%d') as txn_date,
   CASE 
       WHEN withdrawalMethod = 'card' THEN 'Virtual Card' 
       WHEN withdrawalMethod = 'regular' THEN 'Withdrawal Wallet' 
       ELSE 'Unknown Method' 
   END as withdrawalMethod,
    CASE WHEN status IN ('pending', 'rejected') THEN NULL ELSE final_amount END AS final_amount,
    merchant
FROM withdrawal_table 
WHERE user_id = ?;



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
  getUserROIWithdrawalsForMonth: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const query = `
    SELECT COUNT(*) AS count
FROM withdrawal_table
WHERE user_id = ?
AND status = 'approved'
AND wallet_type='roi'
AND MONTH(date) = MONTH(CURRENT_DATE())
AND YEAR(date) = YEAR(CURRENT_DATE());



        `;

        connection.query(query, [userId], (err, results) => {
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
  getAllWithdrawals: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const query = `
           SELECT 
   w.txn_id,w.withdrawal_id,
    w.user_id,u.name,u.country,u.email,
    DATE_FORMAT(w.date, '%Y-%m-%d') as date,
    CASE 
      WHEN w.withdrawalMethod = 'card' THEN 'Virtual Card'
      WHEN w.withdrawalMethod = 'regular' THEN 'Withdrawal Wallet'
      ELSE 'Unknown'
   END AS withdrawalMethod,
    w.amount,
    CASE WHEN w.status IN ('pending', 'rejected') THEN NULL ELSE w.charges END AS charges,
    w.crypto_type,
    UPPER(w.wallet_type) AS wallet_type,
    UPPER(w.status) as status,
    DATE_FORMAT(w.txn_date, '%Y-%m-%d') as txn_date,
    CASE WHEN w.status IN ('pending', 'rejected') THEN NULL ELSE w.final_amount END AS final_amount,
    w.merchant
FROM withdrawal_table w
join users_table u on u.userId =w.user_id 
order by w.date desc; 
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
  getAllRBWithdrawals: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const query = `
      SELECT 
   w.txn_id,w.withdrawal_id,
    w.user_id,u.name,u.country,u.email,
    DATE_FORMAT(w.date, '%Y-%m-%d') as date,
  CASE 
      WHEN w.withdrawalMethod = 'card' THEN 'Virtual Card'
      WHEN w.withdrawalMethod = 'regular' THEN 'Withdrawal Wallet'
      ELSE 'Unknown'
   END AS withdrawalMethod,
    w.amount,
    w.crypto_type,w.charges,
    UPPER(w.wallet_type) AS wallet_type,
    UPPER(w.status) as status,
    DATE_FORMAT(w.txn_date, '%Y-%m-%d') as txn_date,
   w.final_amount ,
    w.merchant
FROM withdrawal_table w
join users_table u on u.userId =w.user_id 
WHERE w.wallet_type = "r&b" AND w.status = "pending"
order by w.date desc; 

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
  getAllIntrestWithdrawals: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const query = `
       SELECT 
   w.txn_id,w.withdrawal_id,
    w.user_id,u.name,u.country,u.email,
    DATE_FORMAT(w.date, '%Y-%m-%d') as date,
    CASE 
      WHEN w.withdrawalMethod = 'card' THEN 'Virtual Card'
      WHEN w.withdrawalMethod = 'regular' THEN 'Withdrawal Wallet'
      ELSE 'Unknown'
   END AS withdrawalMethod,
    w.amount,w.charges,
    w.crypto_type,
    UPPER(w.wallet_type) AS wallet_type,
    UPPER(w.status) as status,
    DATE_FORMAT(w.txn_date, '%Y-%m-%d') as txn_date,
   w.final_amount,
    w.merchant
FROM withdrawal_table w
join users_table u on u.userId =w.user_id 
WHERE w.wallet_type = "interest" AND w.status = "pending"
order by w.date desc;
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
  getAllROIWithdrawals: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const query = `
        SELECT 
   w.txn_id,w.withdrawal_id,
    w.user_id,u.name,u.country,u.email,
    DATE_FORMAT(w.date, '%Y-%m-%d') as date,
    CASE 
      WHEN w.withdrawalMethod = 'card' THEN 'Virtual Card'
      WHEN w.withdrawalMethod = 'regular' THEN 'Withdrawal Wallet'
      ELSE 'Unknown'
   END AS withdrawalMethod,
    w.amount,
w.charges,    w.crypto_type,
    UPPER(w.wallet_type) AS wallet_type,
    UPPER(w.status) as status,
    DATE_FORMAT(w.txn_date, '%Y-%m-%d') as txn_date,
   w.final_amount,
    w.merchant
FROM withdrawal_table w
join users_table u on u.userId =w.user_id 
WHERE w.wallet_type = "roi" AND w.status = "pending" order by w.date desc;
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

  createWithdrawal: async ({ withdraw_amount, currency, merchant }) => {
    const options = {
      amount: withdraw_amount,
      currency: currency,
      merchant: merchant,
      auto_confirm: 1,
    };
    try {
      const result = await client.createTransfer(options);
      return [result, true];
    } catch (error) {
      console.error("erro", error);
      return [error, false];
    }
  },
  updateWithdrawalEntry: async ({
    txn_id,

    status,

    txn_date,
    final_amount,
    charges,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        const query = `
          UPDATE withdrawal_table
          SET 
              status = ?,charges=?,final_amount=?,
             txn_date=?
          WHERE txn_id = ?
        `;
        const values = [status, charges, final_amount, txn_date, txn_id];
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
  // Withdrawal Service
  getWithdrawalDataByTxnId: async (txn_id) => {
    return new Promise((resolve, reject) => {
      let connection;
      try {
        connectionPool.getConnection((err, conn) => {
          if (err) throw err;
          connection = conn;
          const selectQuery = `
          SELECT w.*, u.email 
FROM withdrawal_table AS w
JOIN users_table AS u ON w.user_id = u.userId
WHERE w.txn_id = ?

          `;
          connection.query(selectQuery, [txn_id], (err, results) => {
            if (err) {
              reject(err);
            }
            if (results.length > 0) {
              resolve(results[0]); // assuming one unique record per txn_id
            } else {
              resolve(null);
            }
          });
        });
      } catch (error) {
        reject(error);
      } finally {
        if (connection) {
          connection.release();
        }
      }
    });
  },
  addWithdrawalEntry: async ({
    userId,
    date,
    amount,
    charges,
    currency,
    from_wallet,
    final_amount,
    merchant,
    withdrawal_id,
    withdrawalMethod,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const query =
          "INSERT INTO withdrawal_table ( user_id, date, amount, charges, crypto_type, wallet_type, status,final_amount,merchant,withdrawal_id,withdrawalMethod) VALUES ( ?, ?, ?, ?, ?, ?, 'pending',?,?,?,?)";
        const values = [
          userId,
          date,
          amount,
          charges,
          currency,
          from_wallet,
          final_amount,
          merchant,
          withdrawal_id,
          withdrawalMethod,
        ];

        connection.query(query, values, (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          console.log("Entry added to withdrawal_table");
          resolve();
        });
      });
    });
  },
};

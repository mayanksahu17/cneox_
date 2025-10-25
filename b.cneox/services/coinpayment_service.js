const Coinpayments = require("coinpayments");

const publicKey =
  "33325ca847c8786acb52dd8d38714c57aa4e587ec9076fb5c1a6a75ff918c4f8";
const privateKey =
  "ea084D5b288AD41fAb29428bb632249Db8188FE3766e002F520a02080f857aa8";
const connectionPool = require("./db_service");

const credentials = {
  key: publicKey,
  secret: privateKey,
};

const base_url = process.env.BASE_URL;

const client = new Coinpayments(credentials);

module.exports = {
  getBasicAccountInfo: async () => {
    try {
      const response = await client.getBasicInfo();
      return response;
    } catch (error) {
      console.error("CoinPayments API Error:", error);
      throw error;
    }
  },
  fetchCheckoutUrl: async (txn_id) => {
    return new Promise((res, rej) => {
      const selectQuery =
        "SELECT checkout_url FROM coinpayments_transactions WHERE txn_id = ? AND checkout_url IS NOT NULL LIMIT 1";
      connectionPool.getConnection((err, connection) => {
        if (err) {
          rej(err);
          return;
        }
        connection.query(selectQuery, [txn_id], (error, rows) => {
          connection.release(); // Release the connection after querying
          if (error) {
            rej(error);
          } else if (rows.length) {
            res(rows[0].checkout_url);
          } else {
            res(null);
          }
        });
      });
    });
  },
  getTransactionByTxnId: async (txn_id) => {
    return new Promise((res, rej) => {
      const selectQuery =
        "SELECT * FROM coinpayments_transactions WHERE txn_id = ? ";
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

  saveTransaction: async (transactionData) => {
    console.log(transactionData);
    return new Promise(async (resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        const insertQuery = `
        INSERT INTO coinpayments_transactions (
         user_id,sponsor,voucher_id,package_id,
         type, deposit_amount,voucher_amount,invested_amount,
          amount1, amount2, buyer_name,  currency1, 
          currency2, custom, email, merchant, 
          received_amount, received_confirms,status,status_text, 
          txn_id,checkout_url
        )
         VALUES 
         (
          ?, ?, ?, ?, 
          ?, ?, ?, ?, 
          ?, ?, ?, ?, 
          ?, ?, ?, ?, 
          ?, ?, ?, ?, 
          ?, ?
         )
      `;

        const params = [
          transactionData.user_id,
          transactionData.sponsor,
          transactionData.voucher_id,
          transactionData.package_id,

          transactionData.type,
          transactionData.deposit_amount,
          transactionData.voucher_amount,
          transactionData.invested_amount,

          transactionData.amount1,
          transactionData.amount2,
          transactionData.buyer_name,
          transactionData.currency1,

          transactionData.currency2,
          transactionData.custom,
          transactionData.email,
          transactionData.merchant,

          transactionData.received_amount,
          transactionData.received_confirms,
          transactionData.status,
          transactionData.status_text,

          transactionData.txn_id,
          transactionData.checkout_url,
        ];
        connection.query(insertQuery, params, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results.insertId);
        });
      });
    });
  },
  updateTransaction: async (transactionData) => {
    return new Promise(async (resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        const updateQuery = `
        update coinpayments_transactions set 
       
       received_amount = ?, received_confirms=?, 
          status=?, status_text=?,last_updated_at=NOW() where txn_id=?
         
      `;

        const params = [
          transactionData.received_amount,
          transactionData.received_confirms,
          transactionData.status,
          transactionData.status_text,
          transactionData.txn_id,
        ];
        connection.query(updateQuery, params, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results.insertId);
        });
      });
    });
  },

  getDepositAddress: async (currency) => {
    const options = {
      currency: currency,
    };
    try {
      const response = await client.getDepositAddress(options);
      return response;
    } catch (error) {
      console.error("CoinPayments API Error:", error);
      throw error;
    }
  },
  getAllTransactions: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
      
  SELECT
    c.id,
    c.txn_id,
    c.user_id,
    c.type,
    c.sponsor,
    s.name AS sponsor_name,
    s.country AS sponsor_country,
    s.email AS sponsor_email,
    c.voucher_id,
    c.package_id,
    c.invested_amount,
    c.deposit_amount,
    c.voucher_amount,
    c.amount1,
    c.amount2,
    c.buyer_name,
    c.currency1,
    c.currency2,
    c.custom,
    c.email,
    c.status,
    c.checkout_url,
    c.merchant,
    c.received_amount,
    c.received_confirms,
    c.status_text,
    DATE_FORMAT(c.created_at, '%W, %e %M %Y, %h:%i %p') AS created_at,
    c.created_at AS date,
    c.last_updated_at,
    u.country,
    u.name
FROM
    coinpayments_transactions c 
LEFT JOIN 
    users_table u ON u.userId = c.user_id
LEFT JOIN 
    users_table s ON s.userId = c.sponsor  -- Joining again to get sponsor details
ORDER BY
    c.last_updated_at DESC;

      
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
  createTransaction: async ({
    from_currency,
    to_currency,
    amount,
    custom,
    buyer_email,
    buyer_name,
  }) => {
    var paymentAddress = await module.exports.getDepositAddress(to_currency);
    console.log(paymentAddress);
    const ipn_url = "https://crownbankers.com" + "/api/payment/deposit/ipn";
    // const ipn_url = "https://crownbankers.com" + "/api/payment/deposit/ipn";
    // const ipn_url = ipn_endpoint;

    console.log(ipn_url);

    const options = {
      currency1: from_currency,
      currency2: to_currency,
      amount: amount,
      custom: custom,
      buyer_email: buyer_email,
      address: paymentAddress.address,
      buyer_name: buyer_name,
      ipn_url: ipn_url,
    };

    try {
      const response = await client.createTransaction(options);
      return [response, true];
    } catch (error) {
      console.error("CoinPayments API Error:", error);
      return [error, false];
    }
  },

  getTransactionInfo: async (transactionId) => {
    try {
      const options = {
        txid: transactionId,
        full: 1, // Set to 1 to include raw checkout and shipping data (optional)
      };

      const response = await client.getTx(options);
      return response;
    } catch (error) {
      console.error("CoinPayments API Error:", error);
      throw error;
    }
  },
};

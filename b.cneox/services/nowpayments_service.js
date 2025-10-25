const NowPaymentsApi = require("@nowpaymentsio/nowpayments-api-js");
const client = new NowPaymentsApi({
  apiKey: "78K1EZQ-7S6M25P-PG0DMCN-H7RS191",
});
const publicKey = "c107a611-b0f3-46e9-8944-2729e95816e1";
const connectionPool = require("./db_service");

module.exports = {
  getAllTransactions: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
      
      SELECT
          c.id,
          c.txn_id,
          c.order_id,
          c.user_id,
          c.type,
          c.sponsor,
          c.voucher_id,
          c.package_id,
          c.invested_amount,
          c.deposit_amount,
          c.voucher_amount,
          c.amount1,
          c.amount2,
          c.payment_id,
          c.currency1,
          c.currency2,
          c.custom,
          c.email,
          c.checkout_url,
          c.received_amount,
          c.status_text,
          DATE_FORMAT(c.created_at, '%W, %e %M %Y, %h:%i %p') as created_at,
          c.created_at as date,
          c.last_updated_at,
          u.country,
          u.name
      FROM
          nowpayments_transactions c 
      LEFT JOIN 
          users_table u
      ON
          u.userId =c.user_id
     
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
    price_amount,
    price_currency,
    order_id,
    order_description,
    customer_email,
  }) => {
    const ipn_callback_url =
      "https://crownbankers.com/api/nowpayment/deposit/ipn";
    // const ipn_callback_url = `https://7209-182-48-226-190.ngrok-free.app/api/nowpayment/deposit/ipn`;

    const options = {
      price_amount,
      price_currency,
      order_id,
      order_description,
      ipn_callback_url,
      customer_email,
    };

    try {
      const response = await client.createInvoice(options);
      return [response, true];
    } catch (error) {
      console.error("CoinPayments API Error:", error);
      return [error, false];
    }
  },

  getTransactionInfo: async (transactionId) => {
    try {
      const options = {
        payment_id: transactionId,
      };

      const response = await client.getPaymentStatus(options);
      return response;
    } catch (error) {
      console.error("CoinPayments API Error:", error);
      throw error;
    }
  },
  getTransactionByTxnId: async (txn_id) => {
    return new Promise((res, rej) => {
      const selectQuery =
        "SELECT * FROM nowpayments_transactions WHERE txn_id = ? ";
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
        INSERT INTO nowpayments_transactions (
         user_id,sponsor,voucher_id,package_id,
         type, deposit_amount,voucher_amount,invested_amount,
          amount1, amount2,   currency1, 
          currency2, custom, email,  
          received_amount, status_text, 
          txn_id,checkout_url,order_id
        )
         VALUES 
         (
          ?, ?, ?, ?, 
          ?, ?, ?, ?, 
          ?, ?, ?, 
          ?, ?, ?,
          ?, ?, 
          ?, ?, ?
         )
      `;

        const params = [
          transactionData?.user_id,
          transactionData?.sponsor,
          transactionData?.voucher_id,
          transactionData?.package_id,

          transactionData?.type,
          transactionData?.deposit_amount,
          transactionData?.voucher_amount,
          transactionData?.invested_amount,

          transactionData?.amount1,
          transactionData?.amount2,
          transactionData?.currency1,

          transactionData?.currency2,
          transactionData?.custom,
          transactionData?.email,

          transactionData?.received_amount,
          transactionData?.status_text,

          transactionData?.txn_id,
          transactionData?.checkout_url,
          transactionData?.order_id,
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
        update nowpayments_transactions set 
       
       received_amount = ?, payment_id=?,currency2=?,amount2=?,
          status_text=?,last_updated_at=NOW() where order_id=?
         
      `;

        const params = [
          transactionData?.actually_paid,
          transactionData?.payment_id,
          transactionData?.pay_currency,
          transactionData?.pay_amount,
          transactionData?.payment_status,
          transactionData?.order_id,
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
};

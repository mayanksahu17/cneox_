const { BITIUM_ACCESS_TOKEN } = require("../config/config");
const connectionPool = require("./db_service");

module.exports = {
  createAddress: async ({ cryptoCode, name }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "https://api.bitium.io/v1/external/generateAddress",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "access-token": BITIUM_ACCESS_TOKEN,
            },
            body: JSON.stringify({
              code: cryptoCode,
              name,
            }),
          }
        );

        const result = await response.json();
        const generatedAddress = result.address;
        resolve(generatedAddress);
      } catch (error) {
        reject(error);
      }
    });
  },
  addTransaction: async ({ cryptoCode, address, amountInUSD, userId }) => {
    return new Promise(async (resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const addQuery =
          "INSERT INTO bitium_transactions (currency_code, address, amount_in_usd, userId) VALUES (?, ?, ?, ?)";

        connection.query(
          addQuery,
          [cryptoCode, address, amountInUSD, userId],
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
  getUserByAddress: async ({ address }) => {
    return new Promise(async (resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const getQuery = "SELECT * FROM bitium_transactions WHERE address = ?";

        connection.query(getQuery, [address], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        });
      });
    });
  },
  validateTransaction: async ({
    status,
    amount,
    walletId,
    bitiumId,
    from,
    txId,
    address,
    amountInUSD,
  }) => {
    return new Promise(async (resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updatedAt = new Date().toISOString();

        const updateQuery =
          "UPDATE bitium_transactions SET status = ?, amount_in_crypto = ?, wallet_id = ?, bitium_id = ?, `from` = ?, tx_id = ?, amount_in_usd = ?, updatedAt = ? WHERE address = ?";

        connection.query(
          updateQuery,
          [
            status,
            amount,
            walletId,
            bitiumId,
            from,
            txId,
            amountInUSD,
            updatedAt,
            address,
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
  validateBitiumId: async ({ bitiumId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `https://api.bitium.io/v1/external/validateTx?id=${bitiumId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "access-token": BITIUM_ACCESS_TOKEN,
            },
          }
        );

        const result = await response.json();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllBitiumTransaction: async () => {
    return new Promise(async (resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const getQuery = `
          SELECT bt.*, 
                 u.userId AS user_id,
                 u.name AS user_name, 
                 u.email AS user_email, 
                 u.phone AS user_phone,
                 u.country AS user_country
          FROM bitium_transactions bt
          JOIN users_table u ON bt.userId = u.userId;
        `;

        connection.query(getQuery, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }

          const formattedResults = results.map((row) => {
            const { userId, user_name, user_email, user_phone, ...rest } = row;
            return {
              ...rest,
              user: {
                id: row.user_id,
                name: row.user_name,
                email: row.user_email,
                phone: row.user_phone,
                country: row.user_country,
              },
            };
          });

          resolve(formattedResults);
        });
      });
    });
  },
  updateCheckoutUrl: async ({ address, newCheckoutUrl }) => {
    return new Promise(async (resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE bitium_transactions SET checkout_url = ? WHERE address = ?";

        connection.query(
          updateQuery,
          [newCheckoutUrl, address],
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
  getTransactionById: async ({ transactionId }) => {
    return new Promise(async (resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) return reject(err);

        const getQuery = "SELECT * FROM bitium_transactions WHERE id = ?";

        connection.query(getQuery, [transactionId], (err, results) => {
          connection.release();
          if (err) return reject(err);

          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        });
      });
    });
  },
};

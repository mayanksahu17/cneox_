const connectionPool = require("./db_service");

module.exports = {
  // For creating an entry
  createEntry: async ({
    date,
    admin,
    wallet,
    amount,
    userid,
    type,
    updated_date,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const insertQuery =
          "INSERT INTO funds_management_table (date, admin, wallet, amount, userid, type,updated_date) VALUES (?, ?, ?, ?, ?, ?,?)";

        connection.query(
          insertQuery,
          [date, admin, wallet, amount, userid, type, updated_date],
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

  // For retrieving all entries
  getAllEntries: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `SELECT 
    f.id, 
    f.admin, 
    f.wallet, 
    f.amount, 
    f.userid as user_id,u.name,u.country,u.email, 
    CONCAT(UCASE(LEFT(f.type, 1)), SUBSTRING(f.type, 2)) AS type,
    DATE_FORMAT(f.date, '%Y-%m-%d') AS date,
    DATE_FORMAT(f.updated_date, '%Y-%m-%d') AS updated_date
FROM 
    funds_management_table f join users_table u on u.userId=f.userid order by f.date desc;
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
  // For retrieving single entry
  getEntry: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `SELECT 
    id, 
    admin, 
    wallet, 
    amount, 
    userid, 
    type, 
    DATE_FORMAT(date, '%Y-%m-%d') AS date,
    DATE_FORMAT(updated_date, '%Y-%m-%d') AS updated_date
FROM 
    funds_management_table where id = ?;
`;

        connection.query(selectQuery, [id], (err, results) => {
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

  // For updating an entry based on id
  updateEntry: async ({
    id,
    date,
    admin,
    wallet,
    amount,
    userid,
    type,
    updated_date,
  }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE funds_management_table SET date = ?, admin = ?, wallet = ?, amount = ?, userid = ?, type = ?,updated_date=? WHERE id = ?";

        connection.query(
          updateQuery,
          [date, admin, wallet, amount, userid, type, updated_date, id],
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

  // For deleting an entry based on id
  deleteEntry: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const deleteQuery = "DELETE FROM funds_management_table WHERE id = ?";

        connection.query(deleteQuery, [id], (err, results) => {
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

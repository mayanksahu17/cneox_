const connectionPool = require("./db_service");

module.exports = {
  getAllTickets: async function () {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        const selectQuery = `
          
          SELECT 
            t.id, t.raisedby, t.department, 
            t.service, t.subject, t.description, 
            t.status, t.document, DATE_FORMAT(t.created_date, '%Y-%m-%d') AS created_date, 
            DATE_FORMAT(t.updated_date, '%Y-%m-%d') AS updated_date,
            u.userId,u.name,u.country,u.email,u.phone 
          FROM tickets_table t 
          LEFT JOIN users_table u ON t.raisedby = u.userId
          ORDER BY t.created_date DESC, t.id ASC
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
  getAllTicketsByStatus: async function (status) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        const selectQuery = `
         SELECT 
            t.id, t.raisedby, t.department, 
            t.service, t.subject, t.description, 
            t.status, t.document, DATE_FORMAT(t.created_date, '%Y-%m-%d') AS created_date, 
            DATE_FORMAT(t.updated_date, '%Y-%m-%d') AS updated_date,
            u.userId,u.name,u.country,u.email,u.phone 
          FROM tickets_table t 
          LEFT JOIN users_table u ON t.raisedby = u.userId
          WHERE t.status = ? 
          ORDER BY t.created_date DESC, t.id ASC
        `;

        connection.query(selectQuery, [status], (err, results) => {
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
  getTicketById: async function (id) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        const selectQuery = `SELECT id, raisedby, department, service, subject, description, status, document, DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date, DATE_FORMAT(updated_date, '%Y-%m-%d') AS updated_date 
                             FROM tickets_table 
                             WHERE id = ? 
                             ORDER BY created_date DESC, id ASC`;

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

  getAllTicketsByRaisedBy: async function (raisedBy) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT id, raisedby, department, service, subject, description, status, document, DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date, DATE_FORMAT(updated_date, '%Y-%m-%d') AS updated_date FROM tickets_table  WHERE raisedby = ? ORDER BY created_date DESC, id ASC";

        connection.query(selectQuery, [raisedBy], (err, results) => {
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

  createTicket: async function (ticketData) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        const insertQuery =
          "INSERT INTO tickets_table (raisedby, department, service, subject, description, status,created_date,updated_date,document) VALUES (?,?,?,?, ?, ?, ?, ?, ?)";
        const currentDate = new Date().toISOString().substring(0, 10);
        connection.query(
          insertQuery,
          [
            ticketData.raisedby,
            ticketData.department,
            ticketData.service,
            ticketData.subject,
            ticketData.description,
            ticketData.status,
            currentDate,
            currentDate,
            ticketData.document,
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
  updateTicket: async function (ticketId, ticketData) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE tickets_table SET raisedby=?, department=?, service=?, subject=?, description=?, status=?, updated_date=? ,document=? WHERE id=?";
        const currentDate = new Date().toISOString().substring(0, 10);

        connection.query(
          updateQuery,
          [
            ticketData.raisedby,
            ticketData.department,
            ticketData.service,
            ticketData.subject,
            ticketData.description,
            ticketData.status,
            currentDate,
            ticketData.document, // Use the current date for the updated_date column
            ticketId,
          ],
          (err, results) => {
            connection.release();
            if (err) {
              console.log(err);
              reject(err);
              return;
            }
            resolve(results.affectedRows);
          }
        );
      });
    });
  },

  replyTicket: async function (ticketId, message) {
    return new Promise(async (resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        const updateQuery =
          "UPDATE tickets_table SET reply = ?, status = 'Closed' WHERE id = ?";

        connection.query(updateQuery, [message, ticketId], (err, results) => {
          connection.release();

          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve(results.affectedRows);
        });
      });
    });
  },
};

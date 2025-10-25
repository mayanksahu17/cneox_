const { formatToUKTime } = require("../utils/date");
const connectionPool = require("./db_service");

const notificationService = {
  getUnseenNotificationsForAdmin: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.log(
            "Error in creating connection in getUnseenNotificationsForAdmin service",
            err
          );
          reject(err);
          return;
        }

        try {
          const selectQuery = `SELECT id, user_id, user_type,type, is_seen, message,DATE_FORMAT(created_date, '%W, %e %M %Y, %h:%i %p') as created_date,DATE_FORMAT(updated_date, '%W, %e %M %Y, %h:%i %p') as updated_date FROM  notifications_table WHERE is_seen = 0 AND user_type = 'admin' ORDER BY  created_date DESC`;

          connection.query(selectQuery, (err, result) => {
            if (err) {
              console.log(
                "Error in query in getUnseenNotificationsForAdmin:",
                err
              );
              reject(err);
              return;
            }
            resolve(result);
          });
        } catch (error) {
          console.log(
            "Error in query in getUnseenNotificationsForAdmin:",
            error
          );
          reject(error);
        } finally {
          console.log(
            "Connection is released for getUnseenNotificationsForAdmin"
          );
          connection.release();
        }
      });
    });
  },
  getAllNotifications: async (type) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.log(
            "Error in creating connection in getAllNotificationsForAdmin service",
            err
          );
          reject(err);
          return;
        }

        try {
          const selectQuery = `
          SELECT id, user_id, user_type, is_seen, message,type,
          DATE_FORMAT(created_date, '%W, %e %M %Y, %h:%i %p') as created_date,
          DATE_FORMAT(updated_date, '%W, %e %M %Y, %h:%i %p') as updated_date
           FROM  notifications_table 
           WHERE  user_type = ? 
           ORDER BY  created_date DESC
           `;

          connection.query(selectQuery, [type], (err, result) => {
            if (err) {
              console.log(
                "Error in query in getAllNotificationsForAdmin:",
                err
              );
              reject(err);
              return;
            }
            resolve(result);
          });
        } catch (error) {
          console.log("Error in query in getAllNotificationsForAdmin:", error);
          reject(error);
        } finally {
          console.log("Connection is released for getAllNotificationsForAdmin");
          connection.release();
        }
      });
    });
  },
  getNotificationById: async (id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.log(
            "Error in creating connection in getNotificationById service",
            err
          );
          reject(err);
          return;
        }

        try {
          const selectQuery = `
          SELECT id, user_id, user_type, is_seen, message,type,
          DATE_FORMAT(created_date, '%W, %e %M %Y, %h:%i %p') as created_date,
          DATE_FORMAT(updated_date, '%W, %e %M %Y, %h:%i %p') as updated_date
           FROM  notifications_table 
           WHERE  id = ? 
           ORDER BY  created_date DESC
           `;

          connection.query(selectQuery, [id], (err, result) => {
            if (err) {
              console.log("Error in query in getNotificationById:", err);
              reject(err);
              return;
            }
            resolve(result[0]);
          });
        } catch (error) {
          console.log("Error in query in getNotificationById:", error);
          reject(error);
        } finally {
          console.log("Connection is released for getNotificationById");
          connection.release();
        }
      });
    });
  },
  getAllNotificationsForUserId: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.log(
            "Error in creating connection in getAllNotificationsForAllUsers service",
            err
          );
          reject(err);
          return;
        }

        try {
          const selectQuery = `
          SELECT id, user_id, user_type, is_seen, message,type,
          DATE_FORMAT(created_date, '%W, %e %M %Y, %h:%i %p') as created_date,
          DATE_FORMAT(updated_date, '%W, %e %M %Y, %h:%i %p') as updated_date
           FROM  notifications_table 
           WHERE  user_id = ? 
           ORDER BY  created_date DESC
           `;
          connection.query(selectQuery, [userId], (err, result) => {
            if (err) {
              console.log(
                "Error in query in getAllNotificationsForAllUsers:",
                err
              );
              reject(err);
              return;
            }
            resolve(result);
          });
        } catch (error) {
          console.log(
            "Error in query in getAllNotificationsForAllUsers:",
            error
          );
          reject(error);
        } finally {
          console.log(
            "Connection is released for getAllNotificationsForAllUsers"
          );
          connection.release();
        }
      });
    });
  },
  getUnseenNotificationsByUserId: async (userId) => {
    console.log(userId);
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.log(
            "Error in creating connection in getUnseenNotificationsByUserId service",
            err
          );
          reject(err);
          return;
        }

        try {
          const selectQuery = `
          SELECT id, user_id, user_type, is_seen, message,type,
          DATE_FORMAT(created_date, '%W, %e %M %Y, %h:%i %p') as created_date,
          DATE_FORMAT(updated_date, '%W, %e %M %Y, %h:%i %p') as updated_date
           FROM  notifications_table 
           WHERE  user_id=? and is_seen=0
           ORDER BY  created_date DESC
           `;
          connection.query(selectQuery, [userId], (err, result) => {
            if (err) {
              console.log(
                "Error in query in getUnseenNotificationsByUserId:",
                err
              );
              reject(err);
              return;
            }
            resolve(result);
          });
        } catch (error) {
          console.log(
            "Error in query in getUnseenNotificationsByUserId:",
            error
          );
          reject(error);
        } finally {
          console.log(
            "Connection is released for getUnseenNotificationsByUserId"
          );
          connection.release();
        }
      });
    });
  },
  changeNotificationStatus: async (status, id) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.log(
            "Error in creating connection in changeNotificationStatus service",
            err
          );
          reject(err);
          return;
        }

        try {
          const updateQuery = `UPDATE notifications_table SET is_seen = ?,updated_date=? WHERE id =?`;
          connection.query(
            updateQuery,
            [status, formatToUKTime(), id],
            (err, result) => {
              if (err) {
                console.log("Error in query in changeNotificationStatus:", err);
                reject(err);
                return;
              }
              resolve(result);
            }
          );
        } catch (error) {
          console.log("Error in query in changeNotificationStatus:", error);
          reject(error);
        } finally {
          console.log("Connection is released for changeNotificationStatus");
          connection.release();
        }
      });
    });
  },

  createNotification: async (userId, userType, message, type) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          console.log(
            "Error in creating connection in createNotification service",
            err
          );
          reject(err);
          return;
        }

        try {
          const insertQuery = `INSERT INTO notifications_table (user_id, user_type, message, type, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?)`;
          const values = [
            userId,
            userType,
            message,
            type,
            formatToUKTime(),
            formatToUKTime(),
          ];

          connection.query(insertQuery, values, (err, result) => {
            if (err) {
              console.log("Error in query in createNotification:", err);
              reject(err);
              return;
            }
            resolve(result);
          });
        } catch (error) {
          console.log("Error in query in createNotification:", error);
          reject(error);
        } finally {
          console.log("Connection is released for createNotification");
          connection.release();
        }
      });
    });
  },
};

module.exports = notificationService;

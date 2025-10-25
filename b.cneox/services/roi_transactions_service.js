const connectionPool = require("./db_service");
const {
  sendNotificationToUser,
  sendNotificationToAdmin,
} = require("../utils/notifications");
const { getUKDate, formatToUKTime } = require("../utils/date");
const notificationService = require("./notifications_service");
// Service function to calculate ROI and update wallet balances
const processROITransactions = async () => {
  try {
    // Get all active investments
    const investments = await getActiveInvestments();
    // Process each investment
    for (const investment of investments) {
      // Check user's status
      const user = await getUserStatus(investment.user_id);
      // if (user.status === "suspended" || user.status === "blocked") {
      if (user.status === "blocked") {
        console.log("ROI wont be processes", investment);
        continue; // Skip this iteration and move on to the next
      }

      // Check if the investment type is 'free' and if ROI type is without ROI
      if (investment.type === "free") {
        const freeAccountDetails = await getFreeAccountDetails(
          investment.investment_id
        );
        if (freeAccountDetails?.roi_type === 0) {
          // Assuming that a null or falsy roi_type indicates "without ROI"
          continue; // Skip this iteration
        }
      }
      // Calculate ROI amount based on the package
      const roiAmount = await calculateROI(investment);
      // Create a new ROI transaction entrya
      await createROITransaction(
        investment.investment_id,
        investment.user_id,
        roiAmount
      );

      // Update the wallet balance
      await updateWalletBalance(investment.user_id, roiAmount);

      // Update the current_amount
      // await updateCurrentAmount(investment.investment_id, roiAmount);
      await notificationService.createNotification(
        investment.user_id,
        "user",
        `Congrats! ${roiAmount} ROI credited on ${getUKDate()}`,
        "roi"
      );
    }
    await notificationService.createNotification(
      null,
      "admin",
      `ROI given on ${getUKDate()}`,
      "roi"
    );
    console.log("ROI transactions processed successfully.");
  } catch (error) {
    console.error("Error processing ROI transactions:", error);
  }
};
const getUserStatus = async (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query = "SELECT status FROM users_table WHERE userId = ?";
      connection.query(query, [userId], (err, result) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(result[0]); // We're expecting a single row
      });
    });
  });
};
const getFreeAccountDetails = async (investment_id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query = "SELECT * FROM free_accounts WHERE investment_id = ?";
      connection.query(query, [investment_id], (err, results) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(results[0]); // We're expecting a single row
      });
    });
  });
};

// Fetch all active investments
const getActiveInvestments = async () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query =
        "SELECT * FROM investments_table WHERE expires_on >= CURDATE() and type <> 'powerleg'";
      connection.query(query, (err, results) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
};

const calculateROI = async (investment) => {
  const packageId = investment.package_id;
  let roiAmount;

  // Fetch the package details, including the capping limit
  const packageDetails = await getPackageDetails(packageId);

  roiAmount =
    parseFloat(investment?.invested_amount) *
    (parseFloat(packageDetails?.roi) / 100);

  // Ensure ROI does not exceed the capping limit
  return roiAmount;
};

// Create a new ROI transaction entry
const createROITransaction = async (investmentId, userId, amount) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const created_date = formatToUKTime();
      const query =
        "INSERT INTO roi_txn_table (investment_id, user_id, amount, date, status) VALUES (?, ?, ?, ?, 'new')";
      connection.query(
        query,
        [investmentId, userId, amount, created_date],
        (err, result) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });
  });
};

// Update wallet balance with ROI amount
const updateWalletBalance = async (userId, amount) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `
        UPDATE wallets_table 
        SET 
          roi_wallet = roi_wallet + ?, 
          total_earning = total_earning + ?
        WHERE userId = ?;
      `;
      connection.query(query, [amount, amount, userId], (err, result) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  });
};
// Update the current_amount in investments_table
const updateCurrentAmount = async (investmentId, amount) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query =
        "UPDATE investments_table SET current_amount = current_amount + ? WHERE investment_id = ?";
      connection.query(query, [amount, investmentId], (err, result) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  });
};

// const task = cron.schedule("* * * * *", processROITransactions); // Runs every minute

// // Run the scheduler after 2 minutes (120 seconds)
// setTimeout(() => {
//   console.log("Scheduler started.");
//   task.start();
// }, 120000); // 120,000 milliseconds = 2 minutes

const groupedByStatus = async () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query =
        "SELECT status, COUNT(txn_id) AS transaction_count, SUM(amount) AS total_amount, COUNT(DISTINCT user_id) AS user_count FROM roi_txn_table GROUP BY status;";
      connection.query(query, (err, results) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
};

const getAllROITransactions = async () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `
       SELECT
    r.txn_id,
    u.userId,
    i.package_id,
    mp.package_name,
    mp.roi,u.name,u.email,u.country,u.phone,
    r.amount,
    i.invested_amount,
    DATE_FORMAT(r.date, '%Y-%m-%d') AS date,
    DATE_FORMAT(i.expires_on, '%Y-%m-%d') AS expires_on
FROM
    roi_txn_table r
LEFT JOIN
    investments_table i ON r.investment_id = i.investment_id
LEFT JOIN
    master_table_packages mp ON i.package_id = mp.package_id
LEFT JOIN
    users_table u ON u.userId = r.user_id
ORDER BY
    r.date DESC;     
       `;
      connection.query(query, (err, results) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
};

const filterByStatus = async (status) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query =
        "SELECT status, COUNT(txn_id) AS transaction_count, SUM(amount) AS total_amount, COUNT(DISTINCT user_id) AS user_count FROM roi_txn_table WHERE status = ?;";
      connection.query(query, [status], (err, results) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(results[0]);
      });
    });
  });
};

const filteredByDateRange = async (date1, date2) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query =
        "SELECT status, COUNT(txn_id) AS transaction_count, SUM(amount) AS total_amount, COUNT(DISTINCT user_id) AS user_count FROM roi_txn_table WHERE date >= ? AND date <= DATE_ADD(?, INTERVAL 1 DAY) GROUP BY status;";
      connection.query(query, [date1, date2], (err, results) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
};

const getROITransactionsByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `
        SELECT
    r.txn_id,
    r.user_id,
    i.package_id,
    mp.package_name,
    mp.roi,
    r.amount,
    i.invested_amount,
    DATE_FORMAT(r.date, '%Y-%m-%d') AS date,
    DATE_FORMAT(i.expires_on, '%Y-%m-%d') AS expires_on
FROM
    roi_txn_table r
LEFT JOIN
    investments_table i ON r.investment_id = i.investment_id
LEFT JOIN
    master_table_packages mp ON i.package_id = mp.package_id
 WHERE r.user_id = ? 
    ORDER BY
    r.date DESC;       
       
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
};
const getROITransactionsByUserIdWithLimit = async (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query = `
        SELECT
    r.txn_id,
    r.user_id,
    i.package_id,
    mp.package_name as type,
    mp.roi,
    r.amount as amount,
    i.invested_amount,
    DATE_FORMAT(date,  '%e %b %Y') AS transaction_date,
    DATE_FORMAT(i.expires_on, '%Y-%m-%d') AS expires_on
FROM
    roi_txn_table r
LEFT JOIN
    investments_table i ON r.investment_id = i.investment_id
LEFT JOIN
    master_table_packages mp ON i.package_id = mp.package_id
 WHERE r.user_id = ? 
    ORDER BY
    r.date DESC LIMIT 5;       
       
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
};
const getPackageDetails = async (packageId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;
      const query = "SELECT * FROM master_table_packages WHERE package_id = ?";
      connection.query(query, [packageId], (err, results) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(results[0]); // Return the first (and only) result
      });
    });
  });
};

const getLastWithdrawalDate = async (userId) => {
  console.log("Fetching last withdrawal date for user:", userId);
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;

      const selectQuery =
        "SELECT DATE_FORMAT(MAX(date), '%Y-%m-%d') as last_withdrawal_date FROM withdrawal_table WHERE user_id = ? and status='approved' ";
      connection.query(selectQuery, [userId], (error, results) => {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results[0]?.last_withdrawal_date);
      });
    });
  });
};

const getTotalROIByUser = async (id) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) throw err;

      const selectQuery =
        "SELECT user_id, SUM(amount) AS amount FROM roi_txn_table where user_id=? GROUP BY user_id";
      connection.query(selectQuery, id, (err, results) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
};
module.exports = {
  processROITransactions,
  getAllROITransactions,
  getROITransactionsByUserId,
  groupedByStatus,
  filterByStatus,
  filteredByDateRange,
  getROITransactionsByUserIdWithLimit,
  getTotalROIByUser,
};

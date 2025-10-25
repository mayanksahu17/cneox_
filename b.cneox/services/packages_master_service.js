const connectionPool = require("./db_service");

module.exports = {
  createPackage: async (packageData) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const insertQuery = `
              INSERT INTO master_table_packages (
                package_name, roi, duration, binary_bonus, capping_limit, 
                principle_return, level_one_referral, level_two_referral, 
                level_three_referral, token_referral, status
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

        const values = [
          packageData.package_name,
          packageData.roi,
          packageData.duration,
          packageData.binary_bonus,
          packageData.capping_limit,
          packageData.principle_return,
          packageData.level_one_referral,
          packageData.level_two_referral,
          packageData.level_three_referral,
          packageData.token_referral,
          packageData.status,
        ];

        connection.query(insertQuery, values, (err, results) => {
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
  // Get package data by package ID
  getPackageById: async (packageId) => {
    let data = new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
          SELECT *
          FROM master_table_packages
          WHERE package_id = ?
        `;
        const values = [packageId];

        connection.query(selectQuery, values, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null); // Package not found
          }
        });
      });
    });

    return data;
  },
  geAlltPackage: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
          SELECT *
          FROM master_table_packages
          
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
  updatePackageById: async (packageId, packageData) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const updateQuery = `
          UPDATE master_table_packages
          SET
            package_name = ?,
            roi = ?,
            duration = ?,
            binary_bonus = ?,
            capping_limit = ?,
            principle_return = ?,
            level_one_referral = ?,
            min_amount = ?,
            max_amount = ?,
            status = ?
          WHERE package_id = ?
        `;

        const values = [
          packageData.package_name,
          packageData.roi,
          packageData.duration,
          packageData.binary_bonus,
          packageData.capping_limit,
          packageData.principle_return,
          packageData.level_one_referral,
          packageData.min_amount,
          packageData.max_amount,
          packageData.status,
          packageId,
        ];

        connection.query(updateQuery, values, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });
      });
    });
  }, // Delete package by package ID
  deletePackageById: async (packageId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const deleteQuery = `
          DELETE FROM master_table_packages
          WHERE package_id = ?
        `;
        const values = [packageId];

        connection.query(deleteQuery, values, (err, results) => {
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

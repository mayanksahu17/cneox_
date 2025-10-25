const connectionPool = require("./db_service");
const { formatToUKTime } = require("../utils/date");

module.exports = {
  //signup:create user
  createUser: function ({
    referrer_id,
    position,
    username,
    country,
    phone,
    email,
    hashedPassword,
    securityPin,
    createdAt,
    newPassword,
    state,
    city,
  }) {
    console.log(createdAt);
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;

        var newUserId = await this.generateUserId();
        newUserId = "CROWN-".concat(newUserId);

        // Start a transaction to ensure consistency between user creation, wallet entry, and notification settings entry
        connection.beginTransaction(async (transactionErr) => {
          if (transactionErr) {
            connection.release();
            reject(transactionErr);
            return;
          }

          const insertUserQuery =
            "INSERT INTO users_table (userId, name, email, phone, password, security_pin, country, referrer_id, position, createdAt, new_password,state,city) VALUES (? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

          const insertWalletQuery =
            "INSERT INTO wallets_table (userId) VALUES (?)";

          const insertNotificationsQuery =
            "INSERT INTO notifications_settings (user_id) VALUES (?)";

          const insertCareerLevels =
            "INSERT INTO user_career_levels (user_id) VALUES (?)";

          try {
            // Wrap the query in a promise
            const insertUserPromise = () => {
              return new Promise((resolve, reject) => {
                connection.query(
                  insertUserQuery,
                  [
                    newUserId,
                    username,
                    email,
                    phone,
                    hashedPassword,
                    securityPin,
                    country,
                    referrer_id,
                    position,
                    createdAt,
                    newPassword,
                    state,
                    city,
                  ],
                  (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                  }
                );
              });
            };

            // Insert user
            await insertUserPromise()
              .then(() => {
                // Insert wallet entry
                return new Promise((resolve, reject) => {
                  connection.query(
                    insertWalletQuery,
                    [newUserId],
                    (err, result) => {
                      if (err) reject(err);
                      else resolve(result);
                    }
                  );
                });
              })
              .then(() => {
                // Insert wallet entry
                return new Promise((resolve, reject) => {
                  connection.query(
                    insertCareerLevels,
                    [newUserId],
                    (err, result) => {
                      if (err) reject(err);
                      else resolve(result);
                    }
                  );
                });
              })
              .then(() => {
                // Insert notification settings entry
                return new Promise((resolve, reject) => {
                  connection.query(
                    insertNotificationsQuery,
                    [newUserId],
                    (err, result) => {
                      if (err) reject(err);
                      else resolve(result);
                    }
                  );
                });
              })
              .then(() => {
                // Commit the transaction
                connection.commit((commitErr) => {
                  if (commitErr) {
                    return connection.rollback(() => {
                      connection.release();
                      reject(commitErr);
                    });
                  }

                  connection.release();
                  resolve(newUserId);
                });
              });
          } catch (queryErr) {
            // Rollback the transaction if there's an error
            connection.rollback(() => {
              connection.release();
              reject(queryErr);
            });
          }
        });
      });
    });
  },

  generateUserId: async function () {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) throw err;
        const getQuery =
          "SELECT userId from users_table ORDER BY id DESC LIMIT 1";

        connection.query(getQuery, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }

          if (results.length === 0) {
            resolve("100000");
          } else {
            const input = results[0]["userId"].split("-")[1];

            // Convert input string to integer
            const num = parseInt(input, 10);

            // Increment the integer value by 1
            let nextNum = num + 1;

            // Convert the incremented number to a string
            let nextString = nextNum.toString();

            // Pad the string with leading zeros if necessary
            const paddedString = nextString.padStart(6, "0");

            // Return the new userId
            resolve(`${paddedString}`);
          }
        });
      });
    });
  },
  //referral tree creation
  createReferrals: async function (sponsorId, referredId, position, parentId) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection(async (err, connection) => {
        if (err) {
          connection.release();
          reject(err);
          return;
        }
        const insertQuery =
          "INSERT INTO referrals_table (referrer_id, referred_id, registered_on, position, status, parent_id) VALUES (?, ?, ?, ?, ?, ?)";
        const registeredOn = formatToUKTime();
        const status = "active";

        connection.query(
          insertQuery,
          [sponsorId, referredId, registeredOn, position, status, parentId],
          (err, results) => {
            connection.release();
            if (err) {
              if (err) console.log(err);
              reject(err);
              return;
            }
            resolve();
          }
        );
      });
    }).then(async () => {
      const nextParentId = parentId + 1;
      if (nextParentId <= 1) {
        //7 for ozo
        const getParentIdQuery =
          "SELECT referrer_id FROM referrals_table WHERE referred_id = ?";
        return new Promise((resolve, reject) => {
          connectionPool.getConnection(async (err, connection) => {
            if (err) {
              if (err) console.log(err);
              reject(err);
              return;
            }

            connection.query(getParentIdQuery, [sponsorId], (err, rows) => {
              if (err) console.log(err);
              connection.release();

              if (err) {
                reject(err);
                return;
              }
              if (rows.length > 0) {
                const referrerId = rows[0].referrer_id;
                const nextPosition = position === "left" ? "left" : "right";
                this.createReferrals(
                  referrerId,
                  referredId,
                  nextPosition,
                  nextParentId
                )
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                    return;
                  });
              } else {
                resolve();
              }
            });
          });
        });
      }
    });
  },

  //binary tree creation
  insertIntoBinaryTree: async function (referrerId, newUser, position) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          connection.release();
          reject(err);
          return;
        }

        const recursiveInsert = (currentReferrer) => {
          const findReferrerQuery =
            "SELECT * FROM binary_tree WHERE user_id = ?";
          connection.query(
            findReferrerQuery,
            [currentReferrer],
            (err, results) => {
              if (err) {
                reject(err);
                return;
              }
              // If referrer doesn't exist in the table
              if (results.length === 0) {
                module.exports
                  .generateNextAdminId()
                  .then((nextAdminId) => {
                    const insertReferrerUnderAdmin =
                      "INSERT INTO binary_tree (user_id, parent_id) VALUES (?, ?)";
                    connection.query(
                      insertReferrerUnderAdmin,
                      [currentReferrer, nextAdminId],
                      (err) => {
                        if (err) {
                          reject(err);
                          return;
                        }
                        // Now that referrer is added under an admin, recursively insert the newUser relative to the referrer.
                        recursiveInsert(currentReferrer);
                      }
                    );
                  })
                  .catch((err) => {
                    reject(err);
                  });
                return;
              }
              const referrer = results[0];
              const childPositionColumn =
                position === "left" ? "left_child" : "right_child";
              if (!referrer[childPositionColumn]) {
                // Insert new user as child in null position so the loop ends

                const insertChild = `UPDATE binary_tree SET ${childPositionColumn} = ? WHERE user_id = ?`;
                connection.query(
                  insertChild,
                  [newUser, currentReferrer],
                  (err) => {
                    if (err) {
                      reject(err);
                      return;
                    }
                    const insertNewUserQuery =
                      "INSERT INTO binary_tree (user_id, parent_id) VALUES (?, ?)";
                    connection.query(
                      insertNewUserQuery,
                      [newUser, currentReferrer],
                      (err) => {
                        if (err) {
                          connection.release();
                          reject(err);
                          return;
                        }
                        console.log("binary tree inserted");
                        //now the loop is complete update all te parents downline counts
                        updateDownlinesCount(currentReferrer, newUser, position)
                          .then(() => {
                            console.log(
                              "downline count updated for ",
                              referrerId
                            );
                            connection.release();
                            resolve();
                          })
                          .catch((error) => {
                            console.log(error);
                            connection.release();
                            reject(error);
                          });
                      }
                    );
                  }
                );
              } else {
                recursiveInsert(referrer[childPositionColumn]);
              }
            }
          );
        };

        const updateDownlinesCount = (currentReferrer, userId, position) => {
          return new Promise((resolve, reject) => {
            const getParentAndPositionQuery =
              "SELECT user_id, parent_id, left_child, right_child FROM binary_tree WHERE user_id = ?";
            connection.query(
              getParentAndPositionQuery,
              [currentReferrer],
              (err, results) => {
                if (err) {
                  reject(err);
                  return;
                }
                if (results.length === 0) {
                  resolve();
                  return;
                }
                const parent = results[0].parent_id;
                let direction;

                if (userId === results[0].left_child) {
                  direction = "left_downlines";
                } else if (userId === results[0].right_child) {
                  direction = "right_downlines";
                } else {
                  // This scenario should not happen in a correctly structured binary tree, but it's here as a safety check.
                  reject(
                    new Error(
                      "User is not a left or right child of the parent."
                    )
                  );
                  return;
                }

                const updateQuery = `UPDATE binary_tree SET ${direction} = ${direction} + 1 WHERE user_id = ?`;
                connection.query(updateQuery, [currentReferrer], (err) => {
                  if (err) {
                    reject(err);
                    return;
                  }
                  resolve(
                    updateDownlinesCount(
                      parent,
                      results[0].user_id,
                      direction === "left_downlines" ? "left" : "right"
                    )
                  );
                });
              }
            );
          });
        };

        recursiveInsert(referrerId);
      });
    });
  },

  generateNextAdminId: function () {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          connection.release();
          reject(err);
          return;
        }

        const getLastAdminIdQuery = `
        SELECT user_id FROM binary_tree 
        WHERE user_id LIKE 'CROWN-000%'
        ORDER BY user_id DESC
        LIMIT 1
            `;

        connection.query(getLastAdminIdQuery, (err, results) => {
          if (err) {
            connection.release();
            reject(err);
            return;
          }

          if (!results.length) {
            // No admin ID found in the database; return the first one
            resolve(null);
            // resolve("CROWN-000000");
            return;
          }

          const lastAdminId = results[0].user_id;
          let nextAdminId = incrementString(lastAdminId.substr(3)); // get only the portion after 'CROWN-'

          if (!nextAdminId) {
            // This means we reached 'CROWN-AZZZZZ'; handle it appropriately
            // For this example, we'll reject, but you may want to handle it differently
            reject(new Error("Maximum admin ID limit reached"));
            return;
          }

          resolve("CROWN-" + nextAdminId);
        });
      });
    });
  },
  //update pin
  changePinByUserId: async ({ userId, pin }) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const updateQuery =
          "UPDATE users_table SET security_pin = ? WHERE userId = ?";

        connection.query(updateQuery, [pin, userId], (err, results) => {
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
};
// Helper function to increment the admin suffix

function incrementString(str) {
  let charArray = [...str];
  let hasCarry = false;
  let idx = charArray.length - 1; // start from the end of the string

  do {
    hasCarry = false; // reset the carry for each loop iteration
    let charCode = charArray[idx].charCodeAt(0);

    if (charCode === 90) {
      // Z
      charArray[idx] = "0";
      hasCarry = true;
      idx--;
    } else {
      charArray[idx] = String.fromCharCode(charCode + 1);
    }
  } while (hasCarry && idx >= 0);

  if (idx < 0) {
    // We've overflowed our allowed range
    return null;
  }

  return charArray.join("");
}

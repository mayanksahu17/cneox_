const connectionPool = require("./db_service");
module.exports = {
  //get binary tree by user id

  //get binary tree by user id
  getBinaryTreeByUserId1: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const query = `
          WITH RECURSIVE binary_tree_path AS (
    SELECT 
        id, 
        user_id,
        parent_id,
        left_child,
        right_child,
        left_business,
        right_business,
        left_carry,
        right_carry,
        left_downlines,right_downlines,binary_due,actual_due,matching_due,capping_limit,
        1 AS level,
        1 AS i   -- root node starts with i 1
    FROM binary_tree
    WHERE user_id = ?

    UNION ALL

    SELECT 
        b.id,
        b.user_id,
        b.parent_id,
        b.left_child,
        b.right_child,
        b.left_business,
        b.right_business,
        b.left_carry,
        b.right_carry,  b.left_downlines,b.right_downlines,b.binary_due,b.actual_due,b.matching_due,b.capping_limit,
        bt.level + 1,
        CASE 
            WHEN b.user_id = bt.left_child THEN 2 * bt.i
            ELSE 2 * bt.i + 1 
        END AS i
    FROM binary_tree b
    INNER JOIN binary_tree_path bt 
        ON b.user_id = bt.left_child 
        OR b.user_id = bt.right_child
    WHERE bt.level < 7
)

SELECT 
    bt.*, 
    it.package_id, 
    it.expires_on,
    wt.direct_business,
    ut.verified,ut.name
FROM binary_tree_path AS bt
LEFT JOIN (
    SELECT user_id, package_id, expires_on
    FROM investments_table
    WHERE expires_on > NOW()
    ORDER BY expires_on DESC
) AS it ON bt.user_id = it.user_id 
LEFT JOIN wallets_table AS wt ON bt.user_id = wt.userId
LEFT JOIN users_table AS ut ON bt.user_id = ut.userId;


        `;

        connection.query(query, [userId, userId], (err, results) => {
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

  getAllbinaryTreesByUser: async (parent, child) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const setRecursionDepth = `SET @@cte_max_recursion_depth = 5000;`;

        const selectQuery = `
          WITH RECURSIVE downline AS (
    -- Start with the root user
    SELECT
        bt.user_id,
        bt.left_child,
        bt.right_child
    FROM
        binary_tree bt
    WHERE
        bt.user_id = ?

    UNION ALL

    -- Recursively find all children (both left and right) of the root user's downline
    SELECT
        bt.user_id,
        bt.left_child,
        bt.right_child
    FROM
        binary_tree bt
    INNER JOIN
        downline d ON bt.user_id = d.left_child OR bt.user_id = d.right_child
)
-- Check if the target user (child_user_id) is part of the downline of the root user
SELECT
    *
FROM
    downline
WHERE
    downline.user_id = ?

          `;
        connection.query(setRecursionDepth, (err, res) => {
          if (err) {
            connection.release();
            reject(err);
            return;
          }
          console.log(res);
          connection.query(selectQuery, [parent, child], (err, results) => {
            connection.release();
            if (err) {
              reject(err);
              return;
            }
            resolve(results);
          });
        });
      });
    });
  },
  //get all entries by referred id: for invetsment puposes need to know referred ids to whom bonus will be given
  getReferralsByReferredId: async (referredId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT * FROM referrals_table WHERE referred_id = ?";

        connection.query(selectQuery, [referredId], (err, results) => {
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
  //get all entries by referred id: for invetsment puposes need to know referred ids to whom bonus will be given
  getReferralsByReferrerId: async (referrerId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery = `
         SELECT 
    id,
    referrer_id,
    referred_id,
    DATE_FORMAT(registered_on, '%Y-%m-%d') as registered_on,
   UPPER(position) as position,
    status,
    parent_id
FROM referrals_table 
WHERE referrer_id = ? AND parent_id = 1 ORDER BY id DESC;

         `;

        connection.query(selectQuery, [referrerId], (err, results) => {
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
  //get all entries by referred id: for invetsment puposes need to know referred ids to whom bonus will be given
  getReferralsByReferredIdAndReferralId: async (referredId, referralId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT * FROM referrals_table WHERE referred_id = ? and referrer_id=?";

        connection.query(
          selectQuery,
          [referredId, referralId],
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

  //here are direct referral to find referrer id and parent id 1
  getDirectReferralsCountByUserId: async (referredId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }
        const selectQuery = `
          SELECT COUNT(*) as count 
 FROM referrals_table r 
 JOIN users_table ut ON r.referred_id = ut.userId
 WHERE r.referrer_id = ? AND r.parent_id = 1 AND ut.status = 'active'
          `;

        connection.query(selectQuery, [referredId], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(results[0].count); // returning the count
        });
      });
    });
  },
  getDirectReferralsByUserId: async (referredId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT * FROM referrals_table WHERE referrer_id = ? and parent_id = 1";

        connection.query(selectQuery, [referredId], (err, results) => {
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

  getAllReferrals: async () => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const selectQuery =
          "SELECT id, referrer_id, referred_id, DATE_FORMAT(registered_on, '%Y-%m-%d') AS registered_on, position, status, parent_id FROM referrals_table";

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
  getLatestReferralAndBinary: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
    SELECT
   DATE_FORMAT(date,  '%e %b %Y') AS transaction_date,
    amount,
    'binary' AS type
FROM (
    SELECT * FROM binary_transaction_table
    WHERE user_id =?
    ORDER BY date DESC
    LIMIT 2
) AS last_two_withdrawals
UNION ALL
SELECT
   DATE_FORMAT(date,  '%e %b %Y') AS transaction_date,
    amount,
   'referral' AS type
FROM (
    SELECT * FROM referral_transaction_table
    WHERE user_id =?
    ORDER BY date DESC
    LIMIT 2
) AS last_two_investments
        
        `;

        connection.query(
          selectQuery,
          [userId, userId, userId],
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
  findUserDownline: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
              WITH RECURSIVE referral_cte AS (
                SELECT
                    r.id,
                    r.referrer_id,
                    r.referred_id
                FROM
                    referrals_table r
                WHERE
                    r.referrer_id = ?

                UNION ALL

                SELECT
                    r.id,
                    r.referrer_id,
                    r.referred_id
                FROM
                    referrals_table r
                INNER JOIN
                    referral_cte cte
                ON
                    r.referrer_id = cte.referred_id
            )
            SELECT
                referred_id
            FROM
                referral_cte;

        
        `;

        connection.query(selectQuery, [userId], (err, results) => {
          connection.release();
          if (err) {
            reject(err);
            return;
          }

          // Transform the results into an array of referred IDs
          const referredIds = results.map((row) => row.referred_id);
          resolve(referredIds);
        });
      });
    });
  },
  getDownlineInfo: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;

        const selectQuery = `
        WITH RECURSIVE referral_cte AS (
            SELECT
                r.id,
                r.referrer_id,
                r.referred_id
            FROM
                referrals_table r
            WHERE
                r.referrer_id = ?
    
            UNION ALL
    
            SELECT
                r.id,
                r.referrer_id,
                r.referred_id
            FROM
                referrals_table r
            INNER JOIN
                referral_cte cte
            ON
                r.referrer_id = cte.referred_id
        )
        SELECT
            u.userId,
            u.name,
            u.email,
            u.country
        FROM
            referral_cte c
        INNER JOIN
            users_table u
        ON
            c.referred_id = u.userId;
    `;

        connection.query(selectQuery, [userId], (err, results) => {
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

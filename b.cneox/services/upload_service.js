const { getUKTime } = require("../utils/date");
const connectionPool = require("./db_service");

module.exports = {
  // update Document to usersTable
  updateDocumentToDB: async ({ id, docType, url }) => {
    return new Promise((resolve, reject) => {
      console.log(id, docType, url);
      connectionPool.getConnection((err, connection) => {
        if (err) throw err;
        const created_date = getUKTime();
        const updated_date = getUKTime();
        var updateQuery = "";
        var insertIntoKYC =
          "INSERT INTO kyc (user_id, doctype, doclink, status, created_date,updated_date) VALUES (?, ?, ?, 'pending',?,?)";

        switch (docType) {
          case "PASSPORT":
          case "NATIONAL_ID":
          case "DRIVING_LICENSE":
            switch (docType) {
              case "PASSPORT":
                updateQuery =
                  "UPDATE users_table SET passport = ? WHERE userId = ?";
                break;
              case "NATIONAL_ID":
                updateQuery =
                  "UPDATE users_table SET national_id = ? WHERE userId = ?";
                break;
              case "DRIVING_LICENSE":
                updateQuery =
                  "UPDATE users_table SET driving_license = ? WHERE userId = ?";
                break;
            }
            connection.query(updateQuery, [url, id], (err, results) => {
              if (err) {
                console.log(err);
                reject(err);
                return;
              }
              connection.query(
                insertIntoKYC,
                [id, docType, url, created_date, updated_date],
                (err, results) => {
                  if (err) {
                    console.log(err);
                    reject(err);
                    return;
                  }
                  resolve();
                }
              );
            });
            break;

          case "TICKET_DOC":
            updateQuery = "UPDATE tickets_table SET document = ? WHERE Id = ?";
            connection.query(updateQuery, [url, id], (err, results) => {
              if (err) {
                console.log(err);
                reject(err);
                return;
              }
              resolve();
            });
            break;

          case "PROFILE":
            updateQuery =
              "UPDATE users_table SET profile_picture = ? WHERE userId = ?";
            connection.query(updateQuery, [url, id], (err, results) => {
              if (err) {
                console.log(err);
                reject(err);
                return;
              }
              resolve();
            });
            break;
          case "PROFILE_COVER":
            updateQuery =
              "UPDATE users_table SET profile_cover = ? WHERE userId = ?";
            connection.query(updateQuery, [url, id], (err, results) => {
              if (err) {
                console.log(err);
                reject(err);
                return;
              }
              resolve();
            });
            break;
        }
      });
    });
  },
};

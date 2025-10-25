const nodemailer = require("nodemailer");
require("dotenv").config();
const connectionPool = require("./db_service");
const FormData = require("form-data");
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const boundary = Math.random().toString().slice(2);
const axios = require("axios");
let ElasticEmail = require("@elasticemail/elasticemail-client");

module.exports = {
  sendCommonMail: async ({ to, template, variables }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const from = process.env.mailgun_domain;

        const formData = new FormData();

        formData.append("from", from);
        formData.append("to", to);
        // formData.append("subject", subject);
        formData.append("template", template);
        formData.append("h:X-Mailgun-Variables", JSON.stringify(variables));

        const config = {
          method: "post",
          url: process.env.mailgun_url,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
            Authorization: `Basic ${Buffer.from(
              `api:${MAILGUN_API_KEY}`
            ).toString("base64")}`,
          },
          data: formData,
        };

        // const response = await axios(config);
        // resolve(response);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  sendCommonElasticMail: async ({ to, template, variables }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let defaultClient = ElasticEmail.ApiClient.instance;

        let apikey = defaultClient.authentications["apikey"];
        apikey.apiKey =
          "EB75FFC7853B2A477DF387FC194DB6D44889D5FA2D7EE7D004209FA679272C16FB4CEE95A640F01ED1F6EA9D7C2E0890";

        let api = new ElasticEmail.EmailsApi();

        let email = ElasticEmail.EmailMessageData.constructFromObject({
          Recipients: [new ElasticEmail.EmailRecipient(to)],
          Content: {
            Body: [
              ElasticEmail.BodyPart.constructFromObject({
                ContentType: "HTML",
                Content: "My test email content ;)",
              }),
            ],
            From: "info@crownbankers.com",
            TemplateName: template,
            Merge: variables,
          },
        });

        var callback = function (error, data, response) {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log("API called successfully.");
            resolve(response);
          }
        };
        api.emailsPost(email, callback);
      } catch (error) {
        reject(error);
      }
    });
  },
  sendEmail: async ({ to, subject, message }) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_ID,
      to: to,
      subject: subject,
      text: message,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  },

  createEmailSubmission: async (userId, email, position) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        const date = new Date();
        const query =
          "INSERT INTO email_submissions_table (userId, email, position, date) VALUES (?, ?, ?, ?)";
        const values = [userId, email, position, date];

        connection.query(query, values, (err, results) => {
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

  getAllEmailSubmissions: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        const query =
          "SELECT id, userId, email, position, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM email_submissions_table";
        const values = [userId];

        connection.query(query, values, (err, results) => {
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

  getAllEmailSubmissionsByUserId: async (userId) => {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        const query = "SELECT * FROM email_submissions_table WHERE userId = ?";
        const values = [userId];

        connection.query(query, values, (err, results) => {
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

  sendOTP: async ({
    to,
    template,
    subject,
    userId,

    otp,
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const from = process.env.mailgun_domain;

        const formData = new FormData();

        formData.append("from", from);
        formData.append("to", to);
        formData.append("subject", subject);
        formData.append("template", template);
        formData.append(
          "h:X-Mailgun-Variables",
          JSON.stringify({
            userId: userId,
            otp: otp,
          })
        );

        const config = {
          method: "post",
          url: process.env.mailgun_url,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
            Authorization: `Basic ${Buffer.from(
              `api:${MAILGUN_API_KEY}`
            ).toString("base64")}`,
          },
          data: formData,
        };

        const response = await axios(config);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  sendBulkEmails: async ({ to, template, variables, subject }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const from = process.env.mailgun_bulk_domain;

        const formData = new FormData();
        console.log(to, template, variables, subject);
        formData.append("from", from);
        formData.append("to", to);
        formData.append("subject", subject);
        formData.append("template", template);
        formData.append("h:X-Mailgun-Variables", JSON.stringify(variables));

        const config = {
          method: "post",
          url: process.env.mailgun_bulk_url,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
            Authorization: `Basic ${Buffer.from(
              `api:${process.env.MAILGUN_bulk_API_KEY}`
            ).toString("base64")}`,
          },
          data: formData,
        };

        const response = await axios(config);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
};

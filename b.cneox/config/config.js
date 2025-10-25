// Load environment variables from .env file
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB_DETAILS = {
  connectionLimit: 1000,
  host: process.env.MYSQL_DB_HOSTNAME,
  user: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_SCHEMA,
  connectTimeout: 120000, // 120 seconds
};
const allowedTransferId = "CROWN-100023";
// const allowedTransferId = "CROWN-100463";
module.exports = {
  PORT: PORT,
  DB_DETAILS: DB_DETAILS,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  USER_EMAIL: process.env.USER_EMAIL,
  BITIUM_ACCESS_TOKEN: process.env.BITIUM_ACCESS_TOKEN,
  allowedTransferId,
};

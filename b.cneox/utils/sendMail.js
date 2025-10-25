const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
  USER_EMAIL,
} = require("../config/config");

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = {
  sendMail: async ({ to, subject, html, text }) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAUTH2",
          user: USER_EMAIL,
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken,
        },
      });

      const mailOptions = {
        from: `OneOzo <${USER_EMAIL}>`,
        to,
        subject,
        text,
        html,
      };

      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  },
};

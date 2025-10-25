const moment = require("moment-timezone");

exports.formatDateToYMD = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // months are 0-based in JavaScript
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
exports.getUKTime = () => {
  return new Date(moment.tz("Europe/London").format());
};
exports.formatToUKTime = (isoString) => {
  return moment.tz(isoString, "Europe/London").format("YYYY-MM-DD HH:mm:ss");
};
exports.getUKDate = () => {
  const dateInUK = moment.tz("Europe/London");
  return dateInUK.format("YYYY-MM-DD");
};

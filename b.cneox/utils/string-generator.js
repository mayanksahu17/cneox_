function generateString(stringLen) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let string = "";

  for (let i = 0; i < stringLen; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    string += characters.charAt(randomIndex);
  }

  return string;
}

function generateStringAllCaps(stringLen) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let string = "";

  for (let i = 0; i < stringLen; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    string += characters.charAt(randomIndex);
  }

  return string;
}

module.exports = { generateString, generateStringAllCaps };

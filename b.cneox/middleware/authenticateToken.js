const jwt = require("jsonwebtoken");
const { blockedUsersCache } = require("../utils/cache");
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token." });
    }
    req.user = decoded;
    // Check if the user is blocked
    if (blockedUsersCache.get(req.user.id)) {
      return res.status(401).json({
        success: false,
        message: "You are temporarily blocked. Please try again later.",
      });
    }
    // Check if it's a GET request
    if (req.method === "GET") {
      // Check if the email in the token matches the request query parameter 'email'
      if (req.user.email !== req.query.email) {
        return res.status(401).json({
          success: false,
          message: "Token email does not match request email. 123",
        });
      }
    } else {
      // Check if the email in the token matches the request body 'email'
      if (req.user.email !== req.body.email) {
        return res.status(401).json({
          success: false,
          message: "Token email does not match request email.",
        });
      }
    }

    next();
  });
};

module.exports = {
  authenticateToken,
};

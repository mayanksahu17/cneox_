const jwt = require("jsonwebtoken");
const restrictedRoutes = {
  babyAdmin: [
    "/business/:userId",
    "/kundli",
    "/all-users-data",
    "/users/credentials",
    "/email/verify-link-admin",
    `/email/generate-link-admin`,
    `/free-account`,
    "/funds",
    "referral/",
    "/kyc",
    `/powerleg`,
    `/binary-transactions`,
    `/referral-transactions`,
    `/career-rewards`,
    "/business",
    "/active-list",
    "/user-data-admin",
  ],
  admin: ["/admin-activated-package", "/edit-admin"],
  superAdmin: [],
};

const authenticateTokenAdmin = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(req.path);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token." });
    }
    // if (req?.path !== "/user-app-dashboard-data") {}

    req.user = decoded;
    // Check if user is baby admin
    if (req.user.email === "babyab@crownbankers.com") {
      console.log("inside baby admin");
      if (
        restrictedRoutes.babyAdmin.some((path) => req.path.startsWith(path)) ||
        restrictedRoutes.admin.some((path) => req.path.startsWith(path))
      ) {
        console.log("baby admin restricted");
        return res.status(403).json({
          success: false,
          message: "Access forbidden for baby admin.",
        });
      }
    }

    // Check if user is admin
    if (req.user.email === "ab@crownbankers.com") {
      if (restrictedRoutes.admin.some((path) => req.path.startsWith(path))) {
        return res.status(403).json({
          success: false,
          message: "Access forbidden for admin.",
        });
      }
    }
    if (
      ![
        "ab@crownbankers.com",
        "superab@crownbankers.com",
        "babyab@crownbankers.com",
      ].includes(req.user.email)
    ) {
      return res.status(401).json({
        success: false,
        message: "Bad request.",
      });
    }

    next();
  });
};

module.exports = {
  authenticateTokenAdmin,
};

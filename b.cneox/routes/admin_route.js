const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const coinpaymentsController = require("../controllers/coinpayments_controller");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

router.post("/signup", adminController.signup);

// router.post("/", adminController.createAdmin);

router.post("/signin", adminController.signin);
router.post("/user-signin", authenticateTokenAdmin, adminController.userSignin);

router.get(
  "/admin-activated-package",
  authenticateTokenAdmin,
  adminController.getAllPackages
);
router.get("/stats", adminController.getStats);


router.post("/verify/:id", authenticateTokenAdmin, adminController.verifyAdmin);

router.get(
  "/business/:userId",
  authenticateTokenAdmin,
  adminController.fetchBusinessData
);

router.get(
  "/admin-activated-package/:transactionid",
  authenticateTokenAdmin,
  adminController.getPackageById
);
router.put(
  "/admin-activated-package/:transactionid",
  authenticateTokenAdmin,
  adminController.updatePackage
);
router.delete(
  "/admin-activated-package/:transactionid",
  authenticateTokenAdmin,
  adminController.deletePackage
);
// router.get("/:id", authenticateTokenAdmin, adminController.getAdminById);
// router.put("/:id", authenticateTokenAdmin, adminController.updateAdmin);
// router.delete("/:id", authenticateTokenAdmin, adminController.deleteAdmin);
module.exports = router;

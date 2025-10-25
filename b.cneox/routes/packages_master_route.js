const express = require("express");
const router = express.Router();
const packageController = require("../controllers/package_master_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

// router.post("/", authenticateTokenAdmin, packageController.createPackage);
router.get("/", authenticateTokenAdmin, packageController.geAlltPackage);
router.get(
  "/:packageId",
  authenticateTokenAdmin,
  packageController.getPackageById
);
router.put(
  "/:packageId",
  authenticateTokenAdmin,
  packageController.updatePackageById
);
// router.delete(
//   "/:packageId",
//   authenticateTokenAdmin,
//   packageController.deletePackageById
// );
module.exports = router;

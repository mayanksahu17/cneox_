const express = require("express");
const kycController = require("../controllers/kyc_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

const router = express.Router();

router.post("/kyc", kycController.create);
router.get("/", authenticateTokenAdmin, kycController.getAll);
router.get("/report", kycController.getAllReport);
router.get("/report-forex", kycController.getAllForexChartReport);
router.get("/pending", authenticateTokenAdmin, kycController.getPending);
router.put("/", authenticateToken, kycController.update);
router.post("/addQuery", kycController.addQuery);
router.get("/getQueries", kycController.getQueries);
router.get("/kyc/:userId", kycController.read);
router.post(
  "/approveOrRejecKYC",
  authenticateTokenAdmin,
  kycController.approveOrRejectKYC
);
router.delete("/kyc/:userId", kycController.delete);

module.exports = router;

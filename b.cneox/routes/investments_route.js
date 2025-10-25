const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/investments_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");
router.get(
  "/user",
  authenticateToken,
  investmentController.getInvestmentsByUserId
);
router.get(
  "/downline",
  authenticateToken,
  investmentController.getDownlineInvestmentsByUserId
);
router.get("/", authenticateTokenAdmin, investmentController.getAllInvestments);
router.get(
  "/:investmentId",
  authenticateToken,
  investmentController.getInvestmentById
);

router.post(
  "/admin",
  authenticateTokenAdmin,
  investmentController.createInvestmentAdmin
);

// router.post("/", authenticateToken, invetsmentController.createDownline);

module.exports = router;
// router.post(
//   "/updateBinaryController",
//   // authenticateToken,
//   investmentController.updateBinaryController
// );

// Route
const express = require("express");
const router = express.Router();
const freeAccountsController = require("../controllers/free_accounts_controller");

const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");
router.post("/create", authenticateTokenAdmin, freeAccountsController.create);
router.get("/", authenticateTokenAdmin, freeAccountsController.getAll);
router.get("/:id", authenticateTokenAdmin, freeAccountsController.getById);
router.put("/:id", authenticateTokenAdmin, freeAccountsController.update);
router.delete("/:id", authenticateTokenAdmin, freeAccountsController.delete);

module.exports = router;

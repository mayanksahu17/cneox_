// Route
const express = require("express");
const router = express.Router();
const powerlegController = require("../controllers/powerleg_controller");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");
router.post("/create", authenticateTokenAdmin, powerlegController.create);
router.get("/", authenticateTokenAdmin, powerlegController.getAll);
router.get("/:id", authenticateTokenAdmin, powerlegController.getById);
router.put("/:id", authenticateTokenAdmin, powerlegController.update);
router.delete("/:id", authenticateTokenAdmin, powerlegController.delete);

module.exports = router;

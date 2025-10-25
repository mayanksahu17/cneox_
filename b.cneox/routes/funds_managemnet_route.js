const express = require("express");
const router = express.Router();
const fundController = require("../controllers/funds_managemnet_controller");
const {
  authenticateTokenAdmin,
} = require("../middleware/authenticateTokenAdmin");

router.post("/create", authenticateTokenAdmin, fundController.createEntry);
router.get("/", authenticateTokenAdmin, fundController.getAllEntries);
router.put("/update", authenticateTokenAdmin, fundController.updateEntry);
router.delete(
  "/delete/:id",
  authenticateTokenAdmin,
  fundController.deleteEntry
);
module.exports = router;

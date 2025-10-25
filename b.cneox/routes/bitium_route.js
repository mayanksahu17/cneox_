const express = require("express");
const bitiumController = require("../controllers/bitium_controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const router = express.Router();

router
  .route("/")
  .get(authenticateToken, bitiumController.getAllBitiumTransaction);
router.post("/address", bitiumController.addTransaction);
router.post("/validate", bitiumController.validateTransaction);
router.put("/updateCheckoutUrl", bitiumController.updateCheckoutUrl);

module.exports = router;

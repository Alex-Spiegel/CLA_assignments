const express = require("express");
const router = express.Router();
const { verifyUser } = require("../controllers/verifyController");

// GET-Route für Verifizierung des Tokens
router.get("/", verifyUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const codersController = require("../controllers/codersController");
const profileController = require("../controllers/profileController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

// POST-Route für CODER-REGISTRIERUNG: Validierung -> Controller -> Datenbank-Eintrag
router.post("/register", validateRegister, codersController.registerCoderC);

// POST-Route für CODER-LOGIN: Validierung -> Controller -> Token-Generierung
router.post("/login", validateLogin, codersController.loginCoderC);

// GET-Route für ABRUFEN des CODER-PROFILES: URL-Paramter -> Controller -> Profildaten
router.get("/:id", profileController.getCoderProfile);

// PUT-Route für UPDATEN des CODER-PROFILES: URL-Parameter -> Controller -> Profil-Update
router.put("/:id", profileController.updateCoderProfile);

module.exports = router;

const express = require("express");
const router = express.Router();
const managersController = require("../controllers/managersController");
const profileController = require("../controllers/profileController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

// POST-Route für MANAGER-REGISTRIERUNG: Validierung -> Controller -> Datenbank-Eintrag
router.post("/register", validateRegister, managersController.registerManagerC);

// POST-Route für MANGER-LOGIN: Validierung -> Controller -> Token-Generierung
router.post("/login", validateLogin, managersController.loginManagerC);

// GET-Route für ABRUFEN des MANAGER-PROFILES: URL-Paramter -> Controller -> Profildaten
router.get("/:id", profileController.getManagerProfile);

// PUT-Route für UPDATEN des MANAGER-PROFILES: URL-Parameter -> Controller -> Profil-Update
router.put("/:id", profileController.updateManagerProfile);

module.exports = router;

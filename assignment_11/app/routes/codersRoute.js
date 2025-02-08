const express = require("express");
const router = express.Router();
const codersController = require("../controllers/codersController");
const profileController = require("../controllers/profileController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

// Route für Coder-Registrierung
router.post("/register", validateRegister, codersController.registerCoder);

// Route für Coder-Login
router.post("/login", validateLogin, codersController.loginCoder);

// GET-Route für Coder Profil
router.get("/:id", profileController.getCoderProfile);

// PUT-Route für Coder Profil Update
router.put("/:id", profileController.updateCoderProfile);

module.exports = router;

const express = require("express");
const router = express.Router();
const managersController = require("../controllers/managersController");
const profileController = require("../controllers/profileController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

// Route für MANAGER-Registrierung
router.post("/register", validateRegister, managersController.registerManager);

// Route für MANGER-Login
router.post("/login", validateLogin, managersController.loginManager);

// GET-Route für MANAGER Profil
router.get("/:id", profileController.getManagerProfile);

// PUT-Route für MANAGER Profil Update
router.put("/:id", profileController.updateManagerProfile);

module.exports = router;

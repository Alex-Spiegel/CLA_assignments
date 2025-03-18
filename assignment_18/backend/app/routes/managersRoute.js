const express = require("express");
const router = express.Router();
const managersController = require("../controllers/managersController");
const profilesController = require("../controllers/profilesController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");
const authMiddleware = require("../middlewares/authMiddleware");

// POST-Route für MANAGER-REGISTRIERUNG
router.post("/register", validateRegister, managersController.registerManagerC);

// POST-Route für MANGER-LOGIN
router.post("/login", validateLogin, managersController.loginManagerC);

// GET-Route für ABRUFEN des MANAGER-PROFILES
router.get(
  "/profile",
  authMiddleware(["manager", "coder"]),
  profilesController.getManagerProfileC
);

// PUT-Route für UPDATEN des MANAGER-PROFILES
router.put(
  "/profile",
  authMiddleware(["manager", "coder"]),
  profilesController.updateManagerProfileC
);

module.exports = router;

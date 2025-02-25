const express = require("express");
const router = express.Router();
const codersController = require("../controllers/codersController");
const profilesController = require("../controllers/profilesController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");
const authMiddleware = require("../middlewares/authMiddleware");

// POST-Route für CODER-REGISTRIERUNG
router.post("/register", validateRegister, codersController.registerCoderC);

// POST-Route für CODER-LOGIN
router.post("/login", validateLogin, codersController.loginCoderC);

// GET-Route für ABRUFEN des CODER-PROFILES
router.get(
  "/profile",
  authMiddleware(["manager", "coder"]),
  profilesController.getCoderProfileC
);

// PUT-Route für UPDATEN des CODER-PROFILES
router.put(
  "/profile",
  authMiddleware(["manager", "coder"]),
  profilesController.updateCoderProfileC
);

module.exports = router;

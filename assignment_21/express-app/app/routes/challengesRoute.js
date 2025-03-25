const express = require("express");
const router = express.Router();
const challengesController = require("../controllers/challengesController");
const { validateChallenge } = require("../validators/challengeValidator");
const authMiddleware = require("../middlewares/authMiddleware");

// POST-Route zum CREATEN einer CHALLENGE: Authentifizierung -> Validierung -> Controller -> Datenbank-Eintrag
router.post(
  "/",
  authMiddleware(["manager"]),
  validateChallenge,
  challengesController.createChallengeC
);

// GET-Route für get all Challenges
router.get(
  "/",
  authMiddleware(["manager", "coder"]),
  challengesController.listChallengesC
);

// GET-Route für get all existing categories of Challenges
router.get(
  "/categories",
  authMiddleware(["manager", "coder"]),
  challengesController.getAllCategoriesC
);

// GET-Route für get Challenges by ID
router.get(
  "/:id",
  authMiddleware(["manager", "coder"]),
  challengesController.getChallengeByIdC
);

module.exports = router;

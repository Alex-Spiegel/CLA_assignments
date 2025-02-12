const express = require("express");
const router = express.Router();
const challengesController = require("../controllers/challengesController");
const submissionsController = require("../controllers/submissionsController");
const { validateChallenge } = require("../validators/challengeValidator");
const { validateSubmission } = require("../validators/submissionsValidator");

// POST-Route zum Erstellen einer Challenge
router.post("/", validateChallenge, challengesController.createChallenge);

// GET-Route für get all Challenges
router.get("/", challengesController.getAllChallenges);

// GET-Route für get all existing categories of Challenges
router.get("/categories", challengesController.getAllCategories);

// GET-Route für get Challenges by ID
router.get("/:id", challengesController.getChallengeById);

module.exports = router;

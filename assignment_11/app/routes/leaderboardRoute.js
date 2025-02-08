const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

// GET-Route für Leaderboard-Abfrage
router.get("/", leaderboardController.getLeaderboard);

// GET-Route für Top K Coders-Abfrage
router.get("/top", leaderboardController.getTopCoders);

module.exports = router;

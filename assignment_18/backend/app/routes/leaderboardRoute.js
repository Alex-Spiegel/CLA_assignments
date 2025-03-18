const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");
const authMiddleware = require("../middlewares/authMiddleware");

// GET-Route für Leaderboard-Abfrage
router.get(
  "/",
  authMiddleware(["coder"]),
  leaderboardController.getLeaderboardC
);

// GET-Route für Top K Coders-Abfrage
router.get(
  "/top",
  authMiddleware(["coder"]),
  leaderboardController.getTopCoders
);

module.exports = router;

const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");
const authMiddleware = require("../middlewares/authMiddleware");

// GET-Route für gelöste Challenges für einen bestimmten Coder
router.get(
  "/solved-challenges",
  authMiddleware(["coder"]),
  statisticsController.getSolvedChallengesStats
);

// GET-Route für Trending Categories
router.get(
  "/trending-categories",
  authMiddleware(["coder"]),
  statisticsController.getTrendingCategories
);

// GET-Route für Heatmap
router.get(
  "/heatmap",
  authMiddleware(["coder"]),
  statisticsController.getHeatmap
);

module.exports = router;

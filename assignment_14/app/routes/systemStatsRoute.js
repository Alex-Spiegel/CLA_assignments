const express = require("express");
const router = express.Router();
const {
  getTrendingCategories,
  getHeatmap,
} = require("../controllers/systemStatsController");

// GET-Route für Trending Categories
router.get("/trending-categories", getTrendingCategories);

// GET-Route für Heatmap
router.get("/heatmap", getHeatmap);

module.exports = router;

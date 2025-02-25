const statisticsService = require("../services/statisticsService.js");

//====================================================
// GET-Route für gelöste Challenges für einen bestimmten Coder
//====================================================
const getSolvedChallengesStats = async (req, res) => {
  try {
    const coder_id = req.user.id; // User-ID kommt aus Auth-Middleware
    const stats = await statisticsService.fetchSolvedChallengesStats(coder_id);

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching solved challenges stats:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//====================================================
// GET-Route für Trending Categories
//====================================================
const getTrendingCategories = async (req, res) => {
  try {
    const trendingCategories =
      await statisticsService.fetchTrendingCategories();
    res.status(200).json(trendingCategories);
  } catch (error) {
    console.error("Error fetching trending categories:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//====================================================
// GET-Route für Heatmap
//====================================================
const getHeatmap = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const heatmapData = await statisticsService.fetchHeatmapData(
      start_date,
      end_date,
      req.user.id
    );
    res.status(200).json(heatmapData);
  } catch (error) {
    console.error("Error fetching heatmap data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap,
};

const leaderboardService = require("../services/leaderboardService");

//====================================================
// GET-Route für Leaderboard-Abfrage
//====================================================

const getLeaderboardC = async (req, res) => {
  try {
    const leaderboard = await leaderboardService.getLeaderboard();
    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Leaderboard-Error:", error.message);
    res.status(500).json({ error: "Error retrieving the Leaderboard" });
  }
};

//====================================================
// GET-Route für Top K Coders-Abfrage
//====================================================
const getTopCoders = async (req, res) => {
  try {
    const k = parseInt(req.query.k, 10);

    if (isNaN(k) || k <= 0) {
      return res
        .status(400)
        .json({ message: "Parameter 'k' must be a positive number." });
    }

    const topCoders = await leaderboardService.getTopCoders(k);
    res.status(200).json({ topCoders });
  } catch (error) {
    console.error("Top Coders-Error:", error.message);
    res.status(500).json({ error: "Error retrieving the Top Coders" });
  }
};

module.exports = { getLeaderboardC, getTopCoders };

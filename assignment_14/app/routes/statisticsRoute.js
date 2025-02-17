const express = require("express");
const {
  getSolvedChallengesStats,
} = require("../controllers/statisticsController");

const router = express.Router();

// GET-Route für gelöste Challenges für einen bestimmten Coder
router.get("/solved/:coderId", getSolvedChallengesStats);

module.exports = router;

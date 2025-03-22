const Coder = require("../models/coderSchema");

//====================================================
// GET-Route für Leaderboard-Abfrage
//====================================================
const getLeaderboard = async () => {
  try {
    // Coders abrufen mit ihren Submissions
    const coders = await Coder.find()
      .populate("submissions", "challenge_id passed") // Nur relevante Felder holen
      .lean();

    // Leaderboard-Daten aufbereiten
    const leaderboard = coders.map((coder) => {
      const solvedChallenges = new Set(); // Set für einzigartige Challenge-IDs

      if (coder.submissions) {
        coder.submissions.forEach((submission) => {
          if (submission.passed) {
            solvedChallenges.add(submission.challenge_id.toString());
          }
        });
      }

      return {
        id: coder._id,
        name: `${coder.first_name} ${coder.last_name}`,
        score: coder.score,
        solved_challenges: solvedChallenges.size,
      };
    });

    // Nach Score sortieren (absteigend)
    leaderboard.sort((a, b) => b.score - a.score);

    return leaderboard;
  } catch (error) {
    throw new Error("Error retrieving the leaderboard");
  }
};

//====================================================
// GET-Route für Top K Coders-Abfrage
//====================================================
const getTopCoders = async (k) => {
  try {
    const leaderboard = await getLeaderboard(); // Reuse der Leaderboard-Logik
    return leaderboard.slice(0, k); // Top K Coders zurückgeben
  } catch (error) {
    throw new Error("Error retrieving the Top K Coders");
  }
};

module.exports = { getLeaderboard, getTopCoders };

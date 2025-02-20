// Dummy-Data, wird iwann durch DB Abfrage ersetzt
const coders = [
  { id: 1, name: "Alex", points: 150 },
  { id: 2, name: "Jamie", points: 200 },
  { id: 3, name: "Sam", points: 180 },
];

//====================================================
// GET-Route für Leaderboard-Abfrage
//====================================================

const getLeaderboard = (req, res) => {
  const sortedCoders = coders.sort((a, b) => b.points - a.points);

  res.status(200).json({ leaderboard: sortedCoders });
};

//====================================================
// GET-Route für Top K Coders-Abfrage
//====================================================
const getTopCoders = (req, res) => {
  const k = parseInt(req.query.k, 10);

  if (isNaN(k) || k <= 0) {
    // wenn k keine Nummer oder kleiner gleich 0 ist --> response 400
    return res
      .status(400)
      .json({ message: "Parameter 'k' must be a positive number." });
  }

  const sortedCoders = coders.sort((a, b) => b.points - a.points); // sortiert die coders andhand der punkte absteigend
  const topCoders = sortedCoders.slice(0, k);

  res.status(200).json({ topCoders }); // nur einen slice davon anzeigen 0 - k
};

module.exports = { getLeaderboard, getTopCoders };

// Dummy-Daten für die Trending Categories
const categories = [
  { name: "Math", solved: 120 },
  { name: "Algorithms", solved: 95 },
  { name: "Data Structures", solved: 82 },
  { name: "Python", solved: 70 },
  { name: "JavaScript", solved: 50 },
];

// Dummy-Daten für Heatmap (z.B. Anzahl der richtigen Einreichungen pro Tag)
const heatmapData = [
  { date: "2025-02-01", submissions: 5 },
  { date: "2025-02-02", submissions: 8 },
  { date: "2025-02-03", submissions: 6 },
  { date: "2025-02-04", submissions: 7 },
  { date: "2025-02-05", submissions: 10 },
];

//====================================================
// GET-Route für Trending Categories
//====================================================
const getTrendingCategories = (req, res) => {
  // Hier könnten wir in einer echten Anwendung eine Datenbankabfrage machen
  // und die Kategorien nach deren Popularität (z.B. durch gelöste Challenges) sortieren.

  // Sortiere Kategorien nach "solved" (absteigend) und sende zurück
  const trendingCategories = categories.sort((a, b) => b.solved - a.solved);

  res.status(200).json({
    message: "Trending categories fetched successfully.",
    trendingCategories,
  });
};

//====================================================
// GET-Route für Heatmap
//====================================================
const getHeatmap = (req, res) => {
  const { start_date, end_date } = req.query;

  // Validierung der Datumseingaben (optional, abhängig von den Anforderungen)
  if (start_date && isNaN(Date.parse(start_date))) {
    return res.status(400).json({ message: "Invalid start_date format." });
  }

  if (end_date && isNaN(Date.parse(end_date))) {
    return res.status(400).json({ message: "Invalid end_date format." });
  }

  // Filtere die Heatmap-Daten basierend auf den Start- und End-Daten
  let filteredHeatmapData = heatmapData;

  if (start_date) {
    filteredHeatmapData = filteredHeatmapData.filter(
      (data) => Date.parse(data.date) >= Date.parse(start_date)
    );
  }

  if (end_date) {
    filteredHeatmapData = filteredHeatmapData.filter(
      (data) => Date.parse(data.date) <= Date.parse(end_date)
    );
  }

  res.status(200).json({
    message: "Heatmap data fetched successfully.",
    heatmapData: filteredHeatmapData,
  });
};

module.exports = {
  getTrendingCategories,
  getHeatmap,
};

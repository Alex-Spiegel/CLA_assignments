// Temporär: Hardcoded Challenges im Speicher in echt kommt hier eine DB-Abfrage hin
const challenges = [
  { id: 1, title: "factorial", category: "Math" },
  { id: 2, title: "fibonacci", category: "Math" },
  { id: 3, title: "palindrome", category: "Strings" },
];

//====================================================
// POST /challenges - create a new CHALLENGE
//====================================================
const createChallenge = (req, res) => {
  const { title, category, description, level, code, tests } = req.body;

  // Basic Validierung (könnte auch von Joi übernommen werden, aber wir machen es hier nochmal explizit)
  if (!title || !category || !description || !level || !code || !tests) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const newChallenge = {
    id: challenges.length + 1, // Einfacher Zähler für die Challenge-ID
    title,
    category,
    description,
    level,
    code,
    tests,
  };

  challenges.push(newChallenge); // Challenge wird in das Array gepusht

  res.status(201).json({
    message: "Challenge created successfully!",
    challenge: newChallenge,
  });
};

//====================================================
// GET /challenges - get all CHALLENGES
//====================================================
const getAllChallenges = (req, res) => {
  const { category } = req.query; // holt den 'category' Query-Parameter

  let filteredChallenges = challenges;

  if (category) {
    filteredChallenges = challenges.filter(
      (challenge) => challenge.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.status(200).json({
    challenges: filteredChallenges,
  });
};

//====================================================
// GET /challenges/categories  - get all existing categories of CHALLENGES
//====================================================
const getAllCategories = (req, res) => {
  const categories = challenges.map((challenge) => challenge.category);

  // Doppelte Kategorien entfernen
  const uniqueCategories = [...new Set(categories)];

  res.status(200).json({ categories: uniqueCategories });
};

//====================================================
// GET /challenges/id - get CHALLENGES by ID
//====================================================
const getChallengeById = (req, res) => {
  const id = parseInt(req.params.id, 10); // ID aus der URL holen und in Zahl umwandeln

  const challenge = challenges.find((ch) => ch.id === id); // Challenge suchen

  if (!challenge) {
    return res.status(404).json({ message: "Challenge not found!" });
  }

  res.status(200).json(challenge); // Gefundene Challenge zurückgeben
};

module.exports = {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  getAllCategories,
};

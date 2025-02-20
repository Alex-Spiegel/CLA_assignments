const challengesService = require("../services/challengesService");

//====================================================
// POST /challenges - create a new CHALLENGE
//====================================================
const createChallengeC = async (req, res) => {
  // Manager-ID aus dem Token hinzufügen - damit die eindeutige Manager-Referenzierung funktioniert
  req.body.manager = req.user.id;

  // Challenge-Daten an den Service übergeben
  const result = await challengesService.createChallengeS(req.body);

  // Erfolgreiche Erstellung
  if (result.success) {
    return res.status(201).json({
      message: "Challenge created successfully!",
      challenge: result.data,
    });
  } else {
    return res.status(400).json({ error: result.error });
  }
};

//====================================================
// GET /challenges - get all CHALLENGES
//====================================================
const listChallengesC = async (req, res) => {
  try {
    const user = req.user;
    const result = await challengesService.listChallengesS(user);

    if (result.success) {
      return res.status(200).json({ challenges: result.data });
    }
    res.status(400).json({ error: result.error });
  } catch (error) {
    console.error("Error in listChallengesC:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//====================================================
// GET /challenges/categories  - get all existing categories of CHALLENGES
//====================================================
const getAllCategoriesC = async (req, res) => {
  const categories = await challengesService.getAllCategoriesS();

  res.status(200).json({ categories });
};

//====================================================
// GET /challenges/id - get CHALLENGES by ID
//====================================================
const getChallengeByIdC = async (req, res) => {
  const { id } = req.params;

  // Benutzer aus dem Request-Objekt hinzufügen
  const user = req.user;

  // Service-Funktion mit ID und Benutzer aufrufen
  const challenge = await challengesService.getChallengeByIdS(id, user);

  // Überprüfen, ob die Challenge existiert
  if (!challenge) {
    return res.status(404).json({ message: "Challenge not found!" });
  }

  // Challenge zurückgeben
  res.status(200).json(challenge);
};

module.exports = {
  createChallengeC,
  listChallengesC,
  getAllCategoriesC,
  getChallengeByIdC,
};

// BEISPIEL-BODY FÜRS CHALLENGE ERSTELLEN

// {
//   "title": "Calculate Factorial",
//   "category": "Math",
//   "description": "This challenge requires calculating the factorial of a non-negative integer.",
//   "level": "Hard",
//   "code": {
//     "function_name": "factorial",
//     "code_text": [

//       {
//         "language": "js",
//         "text": "function factorial(n) {\n    if (n === 0) return 1;\n    return n * factorial(n - 1);\n}"
//       }
//     ],
//     "inputs": [
//       {
//         "name": "n",
//         "type": "number",
//         "value": 5
//       }
//     ]
//   },
//   "tests": [
//     {
//       "weight": 0.8,
//       "inputs": [
//         {
//           "name": "n",
//           "type": "number",
//           "value": 5
//         }
//       ],
//       "output": 120
//     }
//   ]
// }

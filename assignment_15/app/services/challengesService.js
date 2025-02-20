const Challenge = require("../models/challengeSchema");

//====================================================
// POST /challenges - create a new CHALLENGE
//====================================================
const createChallengeS = async (challengeData) => {
  try {
    // Neue Challenge erstellen und speichern
    const newChallenge = new Challenge(challengeData);
    const savedChallenge = await newChallenge.save();

    return { success: true, data: savedChallenge };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//====================================================
// GET /challenges - get all CHALLENGES
//====================================================
const listChallengesS = async (user) => {
  try {
    let challenges;

    if (user.role === "manager") {
      // Manager sehen nur ihre eigenen Challenges mit solution_rate, aber ohne Status
      challenges = await Challenge.find({ manager: user.id }).lean();

      challenges = challenges.map((challenge) => {
        const statusArray = challenge.status || [];
        const successfulCoders = statusArray.filter(
          (s) => s.status === "COMPLETED"
        ).length;
        const totalCoders = statusArray.length;
        const solutionRate =
          totalCoders > 0
            ? ((successfulCoders / totalCoders) * 100).toFixed(2)
            : 0;

        return {
          ...challenge,
          solution_rate: solutionRate,
        };
      });
    } else if (user.role === "coder") {
      // Coder sehen alle Challenges mit solution_rate und Status
      challenges = await Challenge.find().lean();

      challenges = challenges.map((challenge) => {
        const statusArray = challenge.status || [];
        const successfulCoders = statusArray.filter(
          (s) => s.status === "COMPLETED"
        ).length;
        const totalCoders = statusArray.length;
        const solutionRate =
          totalCoders > 0
            ? ((successfulCoders / totalCoders) * 100).toFixed(2)
            : 0;

        let status = "WAITING";
        const statusEntry = statusArray.find(
          (s) => s.coder_id?.toString() === user.id
        );
        if (statusEntry) {
          status = statusEntry.status;
        }

        return {
          ...challenge,
          status,
          solution_rate: solutionRate,
        };
      });
    } else {
      return { success: false, error: "Unbekannte Benutzerrolle" };
    }

    return { success: true, data: challenges };
  } catch (error) {
    console.error("Error in listChallengesS:", error.message);
    throw error; // Löst den globalen Fehlerhandler aus, wenn nicht anders abgefangen.
  }
};

//====================================================
// GET /challenges/categories  - get all existing categories of CHALLENGES
//====================================================
const getAllCategoriesS = async () => {
  // Nur die Kategorie-Felder abrufen
  const challenges = await Challenge.find({}, "category").lean();

  // Kategorien extrahieren und Duplikate entfernen
  const uniqueCategories = [...new Set(challenges.map((ch) => ch.category))];

  return uniqueCategories;
};

//====================================================
// GET /challenges/id - get CHALLENGES by ID
//====================================================
const getChallengeByIdS = async (id, user) => {
  // Challenge per ID aus der Datenbank holen
  const challenge = await Challenge.findById(id).lean();
  if (!challenge) return null;

  // solution_rate für alle Benutzer berechnen
  const successfulCoders = challenge.status.filter(
    (s) => s.status === "COMPLETED"
  ).length;
  const totalCoders = challenge.status.length;
  const solutionRate =
    totalCoders > 0 ? ((successfulCoders / totalCoders) * 100).toFixed(2) : 0;

  // Unterscheidung zwischen Manager und Coder
  if (user.role === "manager") {
    // Manager: nur, wenn die Challenge von ihm stammt, mit solution_rate, ohne status
    if (challenge.manager.toString() !== user.id) {
      return null; // Manager darf nur seine eigenen Challenges sehen
    }
    return {
      ...challenge,
      solution_rate: solutionRate,
    };
  }

  if (user.role === "coder") {
    // Coder: sehen alle Challenges mit solution_rate und status
    const statusEntry = challenge.status.find(
      (s) => s.coder_id?.toString() === user.id
    );
    const status = statusEntry ? statusEntry.status : "WAITING";

    return {
      ...challenge,
      solution_rate: solutionRate,
      status,
    };
  }

  // Wenn Rolle unbekannt
  return null;
};

module.exports = {
  createChallengeS,
  listChallengesS,
  getAllCategoriesS,
  getChallengeByIdS,
};

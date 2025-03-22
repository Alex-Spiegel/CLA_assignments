const Challenge = require("../models/challengeSchema");
const Submission = require("../models/submissionSchema");
const { ObjectId } = require("mongodb");

//====================================================
// GET-Route für gelöste Challenges für einen bestimmten Coder
//====================================================
const fetchSolvedChallengesStats = async (coder_id) => {
  try {
    // Zähle alle verfügbaren Herausforderungen je Schwierigkeitsgrad
    const totalChallenges = await Challenge.aggregate([
      {
        $group: {
          _id: "$level",
          count: { $sum: 1 },
        },
      },
    ]);

    // Zähle die korrekt gelösten Herausforderungen je Schwierigkeitsgrad
    const coderObjectId = ObjectId.createFromHexString(coder_id); // konvertiert coder_id (string) in ein ObjectId

    const solvedChallenges = await Submission.aggregate([
      {
        $match: { coder_id: coderObjectId, passed: true }, // Nur korrekte Lösungen des Coders
      },
      {
        $lookup: {
          // mit $lookup holen wir uns die Challenge-Daten
          from: "challenges", // Verbinde mit Challenge-Daten
          localField: "challenge_id", // das Feld der submissions-collection, das als fremdschlüssel dient
          foreignField: "_id", // das Feld der Collection (challenges) das oben als FK verwendet wird. Muss übereinstimmen
          as: "challengeData", // Der Name des neuen Felds, in das die verbundenen Daten aus der "challenges"-Collection gespeichert werden
        },
      },
      {
        $unwind: "$challengeData", // Entpacke das Array
      },
      {
        $group: {
          _id: "$challengeData.level",
          count: { $sum: 1 },
        },
      },
    ]);

    // Ergebnisse in ein strukturiertes JSON-Objekt umwandeln
    const result = {
      totalEasySolvedChallenges:
        solvedChallenges.find((c) => c._id === "Easy")?.count || 0,
      totalModerateSolvedChallenges:
        solvedChallenges.find((c) => c._id === "Moderate")?.count || 0,
      totalHardSolvedChallenges:
        solvedChallenges.find((c) => c._id === "Hard")?.count || 0,
      totalEasyChallenges:
        totalChallenges.find((c) => c._id === "Easy")?.count || 0,
      totalModerateChallenges:
        totalChallenges.find((c) => c._id === "Moderate")?.count || 0,
      totalHardChallenges:
        totalChallenges.find((c) => c._id === "Hard")?.count || 0,
    };

    return result;
  } catch (error) {
    console.error("Error in fetchSolvedChallengesStats:", error);
    throw new Error("Error when fetching statistics");
  }
};

//====================================================
// GET-Route für Trending Categories
//====================================================
const fetchTrendingCategories = async () => {
  try {
    const trendingCategories = await Submission.aggregate([
      { $match: { passed: true } }, // nur korrekte Submissions werden berücksichtigt
      {
        $lookup: {
          // hier Verknüpfung: jede Submission wird mit der challenges-Collection verbunden, um die "category" zu erhalten
          from: "challenges",
          localField: "challenge_id",
          foreignField: "_id",
          as: "challengeData",
        },
      },
      { $unwind: "$challengeData" }, // hier Entpacken: Da $lookup ein Array zurückgibt, wird das Array mit $unwind entpackt
      {
        $group: {
          _id: "$challengeData.category", // Ergebnisse werden nach Kategorie (challengeData.category) gruppiert
          count: { $sum: 1 }, // Kategorie erhält eine count-Summe, die angibt, wie oft sie in den korrekten Submissions vorkam
        },
      },
      { $sort: { count: -1 } }, // Kategorien werden absteigend nach count sortiert (höchste zuerst).
      {
        $project: {
          // nur die Felder category und count werden ausgegeben/ projiziert
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);
    return trendingCategories;
  } catch (error) {
    console.error("Error in fetchTrendingCategories:", error);
    throw new Error("Error when fetching trending categories");
  }
};

//====================================================
// GET-Route für Heatmap
//====================================================
// Der Heatmap-Request liefert die Anzahl der erfolgreichen Submissions pro Tag in einem bestimmten Zeitraum.

const fetchHeatmapData = async (start_date, end_date, coder_id) => {
  try {
    const coderObjectId = ObjectId.createFromHexString(coder_id); // konvertiert coder_id (string) in ein ObjectId

    let startDate;
    let endDate;

    if (start_date) {
      // wenn start_date existiert...
      startDate = new Date(start_date); // ...setze die Variable startDate auf ein neues Datum aus start_date (dem Query-Parameter)
    } else {
      startDate = new Date(); // sonst setze startDate (new Date erzeugt ein date-object)...
      startDate.setFullYear(startDate.getFullYear() - 1); // ... auf das heutige Jahr (startDate.getFullYear() holt das aktuelle Jahr) und setzt das Jahr auf aktuelles Jahr minus 1 (setFullYear())
    }

    if (end_date) {
      endDate = new Date(end_date);
    } else {
      endDate = new Date();
    }

    const heatmapData = await Submission.aggregate([
      {
        $match: {
          coder_id: coderObjectId, // filtert submissions nach Coder-ID...
          passed: true, // ...den bestandenen submissions...
          submission_time: { $gte: startDate, $lte: endDate }, // ...und dem Zeitraum
          // $gte und $lte sind MongoDB-Operatoren für Vergleiche
          // $gte (Greater Than or Equal) → „größer oder gleich“
          // Findet Werte, die größer oder gleich dem angegebenen Wert sind.
          // $lte (Smaller Than or Equal)... vice versa
        },
      },
      {
        $project: {
          // diese Ebene In der MongoDB Aggregation Pipeline heißt "Stage"
          date: {
            $dateToString: { format: "%Y/%m/%d", date: "$submission_time" }, // extrahiert das Datum aus submission_time und projiziert es im format YYYY/MM/DD
          },
        },
      },
      {
        $group: {
          // gruppiert submissions nach Datum und zählt sie
          _id: "$date",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          // liefert date und count als Antwort zurück
          _id: 0, // entfernt _id, damit es nicht doppelt auftaucht
          date: "$_id", // ersetzt _id (welches date enthält) durch ein normales date-Feld
          count: 1,
        },
      },
    ]);
    return heatmapData;
  } catch (error) {
    console.error("Error in fetchHeatmapData:", error);
    throw new Error("Error while fetching heatmap data");
  }
};

module.exports = {
  fetchSolvedChallengesStats,
  fetchTrendingCategories,
  fetchHeatmapData,
};

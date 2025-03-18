const axios = require("axios");
const Submission = require("../models/submissionSchema");
const Challenge = require("../models/challengeSchema");
const Coder = require("../models/coderSchema");

const CODE_RUNNER_URL = "https://runlang-v1.onrender.com/run";

const createSubmissionS = async ({ coder_id, challenge_id, lang, code }) => {
  try {
    // Prüfen, ob der Coder die Challenge bereits erfolgreich abgeschlossen hat
    const existingSubmission = await Submission.findOne({
      coder_id: coder_id,
      challenge_id: challenge_id,
      passed: true,
    });
    if (existingSubmission) {
      return { status: 400, message: "Challenge bereits erfolgreich gelöst" };
    }

    // Challenge-Daten abrufen (inkl. Testfälle)
    const challenge = await Challenge.findById(challenge_id);
    if (!challenge) {
      return { status: 404, message: "Challenge nicht gefunden" };
    }

    // Tests in das richtige Format umwandeln
    const formattedTests = challenge.tests.map((test, index) => ({
      _id: `test${index + 1}`, // Generierte ID für den Test
      inputs: test.inputs.map((input) => ({ value: input.value })), // Nur den Wert der Inputs übergeben
      output: test.output, // Erwartete Ausgabe
    }));

    // Finaler Code-Runner Payload erstellen
    const runnerPayload = {
      lang,
      code,
      func_name: challenge.code.function_name, // Erwarteter Funktionsname aus Challenge
      tests: formattedTests, // Umgewandelte Testfälle
    };

    // Code-Runner aufrufen
    const { data } = await axios.post(CODE_RUNNER_URL, runnerPayload);

    if (data.status !== "passed") {
      // Falls der Code fehlschlägt, Einsendung speichern
      await Submission.create({
        coder_id: coder_id,
        challenge_id: challenge_id,
        code,
        lang,
        passed: false,
      });
      return { status: 400, message: "Tests fehlgeschlagen" };
    }

    // Punktzahl berechnen anhand der Testfall-Gewichtung
    let score = 0;

    for (let i = 0; i < data.test_results.length; i++) {
      if (data.test_results[i].status === "passed") {
        score += challenge.tests[i].weight * 100; // Gewicht ist required, kein Fallback nötig
      }
    }

    // Einsendung speichern
    await Submission.create({
      coder_id: coder_id,
      challenge_id: challenge_id,
      code,
      lang,
      passed: true,
      score,
    });

    // Punktzahl dem Coder hinzufügen
    await Coder.findByIdAndUpdate(coder_id, { $inc: { score } });

    return { status: 200, message: "Challenge erfolgreich bestanden", score };
  } catch (error) {
    console.error("Fehler bei der Code-Einreichung:", error);
    return { status: 500, message: "Interner Serverfehler" };
  }
};

module.exports = { createSubmissionS };

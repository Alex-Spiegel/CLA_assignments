const submissionsService = require("../services/submissionsService");

//====================================================
// POST-Route für CREATE SUBMISSIONS (Bewertung starten)
//====================================================
const createSubmissionC = async (req, res) => {
  try {
    const { challenge_id, lang, code } = req.body;
    const coder_id = req.user.id; // User-ID kommt aus Auth-Middleware

    const submission = await submissionsService.createSubmissionS({
      coder_id,
      challenge_id,
      lang,
      code,
    });

    res
      .status(201)
      .json({ message: "Submission created successfully", submission });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating a submission",
      error: error.message,
    });
  }
};

module.exports = { createSubmissionC };

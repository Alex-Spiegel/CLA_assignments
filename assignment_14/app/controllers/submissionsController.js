const submitCode = (req, res) => {
  const { challenge_id, lang, code } = req.body;

  // Hier kannst du die Logik zur Verarbeitung der Submission hinzufügen
  if (!challenge_id || !lang || !code) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Hier könnten wir später den Code ausführen lassen (Grading)
  res.status(201).json({
    message: "Code submitted successfully!",
    challenge_id,
    lang,
    code,
  });
};

module.exports = {
  submitCode,
};

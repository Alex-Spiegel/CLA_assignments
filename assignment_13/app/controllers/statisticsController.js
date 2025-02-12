// Dummy-Daten für submissions
const submissions = [
  {
    coderId: 1,
    challengeId: "123",
    status: "correct",
    difficulty: "Easy",
  },
  {
    coderId: 1,
    challengeId: "124",
    status: "correct",
    difficulty: "Medium",
  },
  {
    coderId: 1,
    challengeId: "125",
    status: "correct",
    difficulty: "Hard",
  },
  {
    coderId: 2,
    challengeId: "126",
    status: "correct",
    difficulty: "Easy",
  },
  {
    coderId: 1,
    challengeId: "127",
    status: "incorrect",
    difficulty: "Medium",
  },
  {
    coderId: 1,
    challengeId: "128",
    status: "correct",
    difficulty: "Medium",
  },
];

//====================================================
// GET-Route für gelöste Challenges für einen bestimmten Coder
//====================================================
const getSolvedChallengesStats = (req, res) => {
  const coderId = parseInt(req.params.coderId, 10);

  if (isNaN(coderId)) {
    return res.status(400).json({ message: "Invalid coder ID." });
  }

  const solvedChallenges = submissions.filter(
    (submission) =>
      submission.coderId === coderId && submission.status === "correct"
  );

  const stats = {
    Easy: solvedChallenges.filter((s) => s.difficulty === "Easy").length,
    Medium: solvedChallenges.filter((s) => s.difficulty === "Medium").length,
    Hard: solvedChallenges.filter((s) => s.difficulty === "Hard").length,
  };

  res.status(200).json({ coderId, solvedChallengesStats: stats });
};

module.exports = { getSolvedChallengesStats };

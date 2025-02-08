//====================================================
// Logic für REGISTER a new coder
//====================================================
const registerManager = (req, res) => {
  const { username, email, password } = req.body; // mit destructuring

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields must be filled out!" });
  }

  res.status(201).json({
    message: "MANAGER registered successfully!",
    user: { username, email },
  });
};

//====================================================
// Logic für LOGIN a new manager
//====================================================
const loginManager = (req, res) => {
  const email = req.body.email; // explizit statt destructuring
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: "E-Mail and password required!" });
  }

  // Später: Hier würden wir prüfen, ob die Daten in der DB existieren
  res.json({ message: "Login successful!" });
};
module.exports = { registerManager, loginManager };

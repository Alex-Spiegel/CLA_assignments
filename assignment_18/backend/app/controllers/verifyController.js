const verifyService = require("../services/verifyService");

// Controller für die E-Mail-Verifizierung
verifyUser = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Token missing.");
  }

  try {
    const result = await verifyService.verifyToken(token);
    res.status(200).send(result.message);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { verifyUser };

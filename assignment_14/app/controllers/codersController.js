const codersService = require("../services/codersService");

//====================================================
// Logic für REGISTER a new coder
//====================================================
const registerCoderC = async (req, res) => {
  try {
    const coderData = req.body;
    const newCoder = await codersService.registerCoderS(coderData);
    res
      .status(201)
      .json({ message: "Coder registered successfully", coder: newCoder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

//====================================================
// Logic für LOGIN a new coder
//====================================================

const loginCoderC = async (req, res) => {
  const email = req.body.email; // explizit statt destructuring
  const password = req.body.password;

  try {
    const token = await codersService.loginCoderS(email, password);
    res.status(200).json({ message: "Login successfull", token });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error: error.message });
  }
};

module.exports = {
  registerCoderC,
  loginCoderC,
};

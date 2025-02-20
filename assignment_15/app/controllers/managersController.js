const managersService = require("../services/managersService");

//====================================================
// POST-Route für MANAGER-REGISTRIERUNG
//====================================================
const registerManagerC = async (req, res) => {
  try {
    const managerData = req.body;
    const newManager = await managersService.registerManagerS(managerData);
    res.status(201).json({
      message: "Manager registered successfully",
      manager: newManager,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

//====================================================
// POST-Route für MANGER-LOGIN
//====================================================

const loginManagerC = async (req, res) => {
  const email = req.body.email; // explizit statt destructuring
  const password = req.body.password;

  try {
    const token = await managersService.loginManagerS(email, password);
    res.status(200).json({ message: "Login successfull", token });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error: error.message });
  }
};
module.exports = { registerManagerC, loginManagerC };

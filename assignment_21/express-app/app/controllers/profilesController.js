const profilesService = require("../services/profilesService");

//====================================================
// GET-Route für ABRUFEN des CODER-PROFILES
//====================================================
const getCoderProfileC = async (req, res) => {
  try {
    const coderId = req.user.id;
    const coderProfile = await profilesService.fetchCoderProfileS(coderId);
    return res.status(200).json(coderProfile);
  } catch (error) {
    console.error("Error fetching coder profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//====================================================
// GET-Route für ABRUFEN des MANAGER-PROFILES
//====================================================
const getManagerProfileC = async (req, res) => {
  try {
    const managerId = req.user.id;
    const managerProfile = await profilesService.fetchManagerProfileS(
      managerId
    );
    return res.status(200).json(managerProfile);
  } catch (error) {
    console.error("Error fetching manager profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//====================================================
// PUT-Route für UPDATEN des CODER-PROFILES
//====================================================
const updateCoderProfileC = async (req, res) => {
  try {
    const coderId = req.user.id;
    const updatedData = req.body;
    const updatedProfile = await profilesService.updateCoderProfileS(
      coderId,
      updatedData
    );
    return res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating coder profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//====================================================
// PUT-Route für UPDATEN des MANAGER-PROFILES
//====================================================
const updateManagerProfileC = async (req, res) => {
  try {
    const managerId = req.user.id;
    const updatedData = req.body;
    const updatedProfile = await profilesService.updateManagerProfileS(
      managerId,
      updatedData
    );
    return res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating manager profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCoderProfileC,
  getManagerProfileC,
  updateCoderProfileC,
  updateManagerProfileC,
};

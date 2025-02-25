const Coder = require("../models/coderSchema");
const Manager = require("../models/managerSchema");

//====================================================
// GET-Route für ABRUFEN des CODER-PROFILES
//====================================================
const fetchCoderProfileS = async (coderId) => {
  try {
    const coderProfile = await Coder.findById(coderId).select("-password");
    if (!coderProfile) throw new Error("Coder not found");

    // Rank berechnen (basierend auf Score)
    const rank =
      (await Coder.countDocuments({ score: { $gt: coderProfile.score } })) + 1;

    const coderObject = coderProfile.toObject();
    coderObject.rank = rank;

    return coderObject;
  } catch (error) {
    console.error("Error in fetchCoderProfile:", error);
    throw new Error("Error fetching coder profile");
  }
};

//====================================================
// GET-Route für ABRUFEN des MANAGER-PROFILES
//====================================================
const fetchManagerProfileS = async (managerId) => {
  try {
    const managerProfile = await Manager.findById(managerId).select(
      "-password"
    );
    if (!managerProfile) throw new Error("Manager not found");
    return managerProfile;
  } catch (error) {
    console.error("Error in fetchManagerProfile:", error);
    throw new Error("Error fetching manager profile");
  }
};

//====================================================
// PUT-Route für UPDATEN des CODER-PROFILES
//====================================================
const updateCoderProfileS = async (coderId, updatedData) => {
  try {
    const updatedProfile = await Coder.findByIdAndUpdate(coderId, updatedData, {
      new: true,
      runValidators: true,
      select: "-password",
    });
    if (!updatedProfile) throw new Error("Coder not found");
    return updatedProfile;
  } catch (error) {
    console.error("Error updating coder profile:", error);
    throw new Error("Error updating coder profile");
  }
};

//====================================================
// PUT-Route für UPDATEN des MANAGER-PROFILES
//====================================================
const updateManagerProfileS = async (managerId, updatedData) => {
  try {
    const updatedProfile = await Manager.findByIdAndUpdate(
      managerId,
      updatedData,
      {
        new: true,
        runValidators: true,
        select: "-password",
      }
    );
    if (!updatedProfile) throw new Error("Manager not found");
    return updatedProfile;
  } catch (error) {
    console.error("Error updating manager profile:", error);
    throw new Error("Error updating manager profile");
  }
};

module.exports = {
  fetchCoderProfileS,
  fetchManagerProfileS,
  updateCoderProfileS,
  updateManagerProfileS,
};

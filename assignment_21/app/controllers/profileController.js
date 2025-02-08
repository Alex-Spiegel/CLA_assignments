const updateCoderProfile = require("../services/profileService");

const updateProfile = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file); // Debug: Check, ob die Datei ankommt

    if (!req.file) {
      return res.status(400).json({ error: "Keine Datei hochgeladen!" });
    }

    // Profil aktualisieren (inkl. Bild-Upload zu Supabase)
    const updatedProfile = await updateCoderProfile(req.body, req.file);

    res.json({ message: "Profil aktualisiert!", profile: updatedProfile });
  } catch (err) {
    console.error("Fehler beim Aktualisieren:", err);
    res.status(500).json({ error: "Fehler beim Aktualisieren des Profils" });
  }
};

module.exports = { updateProfile };

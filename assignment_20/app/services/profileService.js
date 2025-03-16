const { uploadToSupabase } = require("../utils/supabaseUpload");

async function updateCoderProfile(requestData, file) {
  const { first_name, last_name, about } = requestData;
  let avatar_url = await uploadToSupabase(file);

  // Falls kein neues Bild hochgeladen wurde, bleibt das alte bestehen
  const updatedProfile = {
    first_name: first_name || null,
    last_name: last_name || null,
    about: about || null,
    avatar_url: avatar_url || null,
  };

  // Hier würdest du die Datenbank updaten, z. B. mit Supabase oder SQL
  console.log("Profil-Daten zum Speichern:", updatedProfile);

  return updatedProfile;
}

module.exports = updateCoderProfile;

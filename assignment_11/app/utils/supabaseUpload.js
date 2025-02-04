const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function uploadToSupabase(file) {
  if (!file) return null;

  const fileExt = path.extname(file.originalname);
  const fileName = `avatar_${Date.now()}${fileExt}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    console.error("Upload-Fehler:", error);
    return null;
  }

  return `${process.env.SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
}

module.exports = { uploadToSupabase };

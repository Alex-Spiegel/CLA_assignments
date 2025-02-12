const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/userSchema");

dotenv.config({ path: "../.env" }); // Pfad nötig, da dotenv.config nur im VZ des skripts nach .env sucht

// Dummy-Daten Funktion
const seedDatabase = async () => {
  try {
    // Verbindung zur DB
    await mongoose.connect(process.env.MONGO_URI, { dbName: "CodeCLA-DB" }); // explizit sagen, sonst wird DB namens "test" erstellt

    // Dummy User (Manager)
    await User.create({
      first_name: "Sohaib",
      last_name: "Admin",
      email: "sohaib@example.com",
      password: "securepassword",
      role: "coder",
      description: "loves algorythms",
      score: 300,
    });

    console.log("✅ Dummy-Daten erfolgreich hinzugefügt!");
  } catch (error) {
    console.error("❌ Fehler beim Seeden:", error);
  } finally {
    mongoose.connection.close(); // Verbindung schließen
    process.exit(0); // Skript sauber beenden
  }
};

// Funktion aufrufen
seedDatabase();

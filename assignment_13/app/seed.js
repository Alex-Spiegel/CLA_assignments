const mongoose = require("mongoose");
const User = require("./models/userModel");

// Dummy-Daten Funktion
const seedDatabase = async () => {
  try {
    // Verbindung zur DB
    await mongoose.connect(process.env.MONGO_URI);

    // Dummy User (Manager)
    await User.create({
      first_name: "Alice",
      last_name: "Admin",
      email: "alice@example.com",
      password: "securepassword",
      role: "manager",
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

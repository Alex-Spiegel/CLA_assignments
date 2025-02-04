const express = require("express");
const dotenv = require("dotenv");
const profileRoutes = require("./app/routes/profileRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", profileRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

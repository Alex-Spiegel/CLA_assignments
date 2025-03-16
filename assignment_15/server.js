const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./app/config/db");
const codersRouter = require("./app/routes/codersRoute");
const managersRouter = require("./app/routes/managersRoute");
const verifyRouter = require("./app/routes/verifyRoute");
const challengesRouter = require("./app/routes/challengesRoute");
const submissionsRouter = require("./app/routes/submissionsRoute");
const leaderboardRouter = require("./app/routes/leaderboardRoute");
const statisticsRouter = require("./app/routes/statisticsRoute");
const cors = require("cors");

const app = express();

app.use(express.json()); // JSON-Parsing für Requests

app.use(
  cors({
    origin: "http://localhost:8080", // Erlaubt Anfragen nur von hier, dem Next.js-Frontend
    credentials: true, // true fürs Erlauben von Cookies und Auth-Headers
  })
);

// hier wird die Coders-Route initialisiert
app.use("/coders", codersRouter);
// hier wird die Managers-Route initialisiert
app.use("/managers", managersRouter);
// hier wird die verification-Route initialisiert
app.use("/verify", verifyRouter);
// hier wird die Challenges-Route initialisiert
app.use("/challenges", challengesRouter);
// hier wird die Submissions-ROute initialisiert
app.use("/submissions", submissionsRouter);
// hier wird die Leaderboards-Route initialisiert
app.use("/leaderboard", leaderboardRouter);
// hier wird die statistics-Route initialisiert
app.use("/statistics", statisticsRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something has fone wrong!" });
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

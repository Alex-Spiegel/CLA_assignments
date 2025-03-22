const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./app/config/db");
const jwt = require("jsonwebtoken");

// GraphQL stuff
const { graphqlHTTP } = require("express-graphql");
const schema = require("./app/graphql/schema");

const codersRouter = require("./app/routes/codersRoute");
const managersRouter = require("./app/routes/managersRoute");
const verifyRouter = require("./app/routes/verifyRoute");
const challengesRouter = require("./app/routes/challengesRoute");
const submissionsRouter = require("./app/routes/submissionsRoute");
const leaderboardRouter = require("./app/routes/leaderboardRoute");
const statisticsRouter = require("./app/routes/statisticsRoute");
const cors = require("cors");

const app = express(); // HIER WIRD DIE APP INSTANZIIERT

// 'ne Middleware: JSON-Parsing für Requests
app.use(express.json());

// 'ne Middleware: cors für "Cross-Origin-Sharing" (Ursprungsübergreifende Ressourcenfreigabe)

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173"], // Erlaubt Anfragen nur von hier, dem Next.js-Frontend (8080) & dem React-Frontend (5173)
    credentials: true, // true fürs Erlauben von Cookies und Auth-Headers
  })
);

// Datenbankverbindung frühzeitig aufbauen
connectDB();

// GraphQL-API
app.use(
  "/graphql",
  graphqlHTTP((req) => {
    let user = null;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.error("Invalid token");
      }
    }

    return {
      schema,
      graphiql: { headerEditorEnabled: true }, // UI (mit header section) aktivieren
      context: { user }, // context mitgeben
    };
  })
);

// hier werden die REST-API-Routen initialisiert
app.use("/coders", codersRouter);
app.use("/managers", managersRouter);
app.use("/verify", verifyRouter);
app.use("/challenges", challengesRouter);
app.use("/submissions", submissionsRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/statistics", statisticsRouter);

// globales Fehler-Handling ans Ende
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something has gone wrong!" });
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware zur Authentifizierung und Autorisierung
const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token is missing or invalid." });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Token verifizieren
      const decoded = jwt.verify(token, JWT_SECRET);

      // Check if the token contains the necessary fields
      if (!decoded.id || !decoded.email || !decoded.role) {
        return res
          .status(400)
          .json({ message: "Token is missing required fields." });
      }

      // Benutzerinformationen dem Request-Objekt hinzufügen
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      // Überprüfen, ob die Benutzerrolle erlaubt ist
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied." });
      }

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired." });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Token is invalid." });
      } else {
        return res.status(401).json({ message: "Authentication failed." });
      }
    }
  };
};

module.exports = authMiddleware;

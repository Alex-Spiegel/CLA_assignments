const coderModel = require("../models/coderSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

//====================================================
// POST-Route für CODER-REGISTRIERUNG
//====================================================
registerCoderS = async (coderData) => {
  const { first_name, last_name, email, password, description } = coderData;

  // Überprüfen, ob die E-Mail bereits existiert
  const existingCoder = await coderModel.findOne({ email });
  if (existingCoder) {
    throw new Error("This email already exists.");
  }

  // Passwort hashen
  const hashedPassword = await bcrypt.hash(password, 10);

  // Neuen Coder anlegen
  const newCoder = await coderModel.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    description,
    role: "coder",
  });

  // JWT-Token generieren
  const token = jwt.sign(
    { id: newCoder._id, role: newCoder.role },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  // Verifizierungslink erstellen
  const verificationLink = `http://localhost:5000/verify?token=${token}`;

  // E-Mail mit Verifizierungslink senden
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: EMAIL_USER,
    to: newCoder.email,
    subject: "Verify your email address.",
    text: `Please click the following link to verify your email address: ${verificationLink}`,
  });

  return newCoder;
};

//====================================================
// POST-Route für CODER-LOGIN
//====================================================
loginCoderS = async (email, password) => {
  const user = await coderModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  if (!user.is_verified) {
    throw new Error("Please verify your email before logging in.");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return token;
};

module.exports = {
  registerCoderS,
  loginCoderS,
};

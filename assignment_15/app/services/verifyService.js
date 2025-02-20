const jwt = require("jsonwebtoken");
const coderModel = require("../models/coderSchema");
const managerModel = require("../models/managerSchema");

const JWT_SECRET = process.env.JWT_SECRET;

// Service für die E-Mail-Verifizierung
verifyToken = async (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  const { id, role } = decoded;

  let user;

  if (role === "coder") {
    user = await coderModel.findById(id);
  } else if (role === "manager") {
    user = await managerModel.findById(id);
  } else {
    throw new Error("Invalid user role.");
  }

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.is_verified) {
    return { message: "User is already verified." };
  }

  user.is_verified = true;
  await user.save();

  return {
    message: "Email successfully verified. You can now log in.",
  };
};

module.exports = {
  verifyToken,
};

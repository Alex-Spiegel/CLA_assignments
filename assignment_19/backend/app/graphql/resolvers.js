const dotenv = require("dotenv");
dotenv.config();
const Challenge = require("../models/challengeSchema"); // Mongoose-Modell needed
const Coder = require("../models/coderSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const resolvers = {
  getAllCategories: async () => {
    try {
      return await Challenge.distinct("category"); // Alle Kategorien aus der DB holen
    } catch (error) {
      throw new Error("Fehler beim Abrufen der Kategorien");
    }
  },

  getChallengesByCategory: async (_, { category }) => {
    try {
      const filter = category ? { category } : {}; // Falls category null ist, ALLE Challenges holen
      const challenges = await Challenge.find(filter);

      return challenges;
    } catch (error) {
      throw new Error("Error when fetching challenges by category");
    }
  },

  getChallengeById: async (parent, args) => {
    const id = args.id;
    try {
      return await Challenge.findById(id);
    } catch (error) {
      throw new Error("Challenge not found");
    }
  },

  loginUser: async (_, { email, password }) => {
    const user = await Coder.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return token;
  },

  getMyProfile: async (_, __, context) => {
    try {
      const userId = context.user?.id;

      if (!userId) {
        throw new Error("Unauthorized: No user ID found in context");
      }

      const coder = await Coder.findById(userId);
      if (!coder) {
        throw new Error("User not found");
      }

      return coder;
    } catch (error) {
      throw new Error("Error fetching profile");
    }
  },
};

module.exports = resolvers;

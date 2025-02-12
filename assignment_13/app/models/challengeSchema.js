const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Challenge"; // der Name des DIESES Mongoose Modells/ dieser file: hier "Challenge"
const COLLECTION_NAME = "challenges"; // Name der Collection in der DB

// Challenge Schema definieren
const challengeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Moderate", "Hard"],
    required: true,
  },
  codeSnippet: {
    type: String, // Code als String speichern
    required: true,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User", // Verweis auf die User-Collection
    required: true,
  },
  testCases: [
    { type: Schema.Types.ObjectId, ref: "TestCase" }, // Verweis auf TestCases
  ],
});

// Challenge Model erstellen und exportieren
const challengeModel = model(DOCUMENT_NAME, challengeSchema, COLLECTION_NAME);
module.exports = challengeModel;

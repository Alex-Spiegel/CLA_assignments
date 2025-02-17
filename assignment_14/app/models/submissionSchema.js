const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Submission"; // der Name des DIESES Mongoose Modells/ dieser file: hier "Submissions"
const COLLECTION_NAME = "submissions"; // Name der Collection in der DB

// Submission Schema definieren
const submissionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Verweis auf den User
  challenge: {
    type: Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  }, // Verweis auf die Challenge
  submission_time: {
    type: Date,
    default: Date.now,
  },
  passed_grading: {
    type: Boolean,
    default: false,
  },
  final_score: {
    type: Number,
    default: 0,
  },
  code: {
    type: String,
    required: true,
  },
});

// Submission Model erstellen und exportieren
const submissionModel = model(DOCUMENT_NAME, submissionSchema, COLLECTION_NAME);
module.exports = submissionModel;

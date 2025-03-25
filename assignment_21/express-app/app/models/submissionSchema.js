const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Submission"; // der Name des DIESES Mongoose Modells/ dieser file: hier "Submissions"
const COLLECTION_NAME = "submissions"; // Name der Collection in der DB

// Submission Schema definieren
const submissionSchema = new Schema({
  coder_id: {
    type: Schema.Types.ObjectId,
    ref: "Coder", // Verweis auf Coder, der submission einreicht
    required: true,
  },
  challenge_id: {
    type: Schema.Types.ObjectId,
    ref: "Challenge", // Verweis auf die Challenge, auf die sich die submission bezieht
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    enum: ["py", "js"],
    required: true,
  },
  passed: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    default: 0,
  },
  submission_time: {
    type: Date,
    default: Date.now,
  },
});

// Submission Model erstellen und exportieren
const submissionModel = model(DOCUMENT_NAME, submissionSchema, COLLECTION_NAME);
module.exports = submissionModel;

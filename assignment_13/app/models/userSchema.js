const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DOCUMENT_NAME = "User"; // der Name des DIESES Mongoose Modells/ dieser file: hier "User"
const COLLECTION_NAME = "users"; // Name der Collection in der DB

// User Schema definieren
const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["coder", "manager"],
  },
  description: {
    type: String,
    required: function () {
      return this.role === "coder";
    },
  },
  score: {
    type: Number,
    default: 0,
    required: function () {
      return this.role === "coder";
    },
  },
  submissions: [
    { type: Schema.Types.ObjectId, ref: "Submission" }, // Hier referenzierst du die Submissions
  ],
});

// Model erstellen und exportieren
const userModel = model(DOCUMENT_NAME, userSchema, COLLECTION_NAME);
module.exports = userModel;

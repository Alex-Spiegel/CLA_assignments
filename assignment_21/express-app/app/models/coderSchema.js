const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Coder"; // der Name des DIESES Mongoose Modells/ dieser file: hier "Coder"
const COLLECTION_NAME = "coders"; // Name der Collection in der DB von MongoDB

// coder Schema definieren
const coderSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
  role: { type: String, required: true, enum: ["coder"] },
  is_verified: { type: Boolean, default: false },

  description: { type: String, default: null },
  score: { type: Number, default: 0 },
  submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
});

// Model erstellen und exportieren
const coderModel = model(DOCUMENT_NAME, coderSchema, COLLECTION_NAME);
module.exports = coderModel;

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Manager"; // der Name des DIESES Mongoose Modells/ dieser file: hier "Manager"
const COLLECTION_NAME = "managers"; // Name der Collection in der DB von MongoDB

// manager Schema definieren
const managerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
  role: { type: String, required: true, enum: ["manager"] },
  is_verified: { type: Boolean, default: false },

  challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
});

// Model erstellen und exportieren
const Manager = model(DOCUMENT_NAME, managerSchema, COLLECTION_NAME);
module.exports = Manager;

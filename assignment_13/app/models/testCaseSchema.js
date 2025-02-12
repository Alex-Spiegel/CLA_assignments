const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DOCUMENT_NAME = "TestCase"; // der Name des DIESES Mongoose Modells/ dieser file: hier "TestCase"
const COLLECTION_NAME = "testcases"; // Name der Collection in der DB

// TestCase Schema definieren
const testCaseSchema = new Schema({
  challenge: {
    type: Schema.Types.ObjectId,
    ref: "Challenge", // Verweis auf die Challenge
    required: true,
  },
  inputValue: {
    type: {
      type: String,
      enum: ["number", "string"], // Datentyp der Eingabe
      required: true,
    },
    name: {
      type: String, // Name des Funktionsarguments
      required: true,
    },
    value: {
      type: String, // Wert des Funktionsarguments
      required: true,
    },
  },
  expected_output: {
    type: Schema.Types.Mixed, // Kann auch mehrere Typen haben (String, Number, etc.)
    required: true,
  },
  weight: {
    type: Number,
    min: 0,
    max: 1,
    required: true,
  },
});

// TestCase Model erstellen und exportieren
const testCaseModel = model(DOCUMENT_NAME, testCaseSchema, COLLECTION_NAME);
module.exports = testCaseModel;

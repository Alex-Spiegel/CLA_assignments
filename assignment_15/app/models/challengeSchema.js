const { required } = require("joi");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Challenge"; // der Name des DIESES Mongoose Modells/ dieser file: hier "Challenge"
const COLLECTION_NAME = "challenges"; // Name der Collection in der DB

// Challenge Schema definieren
const challengeSchema = new Schema(
  {
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
    level: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      required: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Manager", // Verweis auf den erstellenden Manager
      required: true,
    },

    //Code-Block
    code: {
      function_name: { type: String, required: true },
      code_text: {
        language: { type: String, enum: ["py", "js"], required: true },
        text: { type: String, required: true },
      },

      inputs: [
        {
          name: { type: String, required: true }, // default n, MISSING
          type: { type: String, enum: ["number", "string"], required: true }, // MISSING
        },
      ],
    },

    // Test Cases
    tests: [
      {
        weight: { type: Number, min: 0, max: 1, required: true },
        inputs: [
          {
            name: { type: String, required: true }, // MISSING
            value: { type: mongoose.Schema.Types.Mixed, required: true }, // MISSING
          },
        ],
        output: { type: mongoose.Schema.Types.Mixed, required: true },
      },
    ],
    solution_rate: {
      type: Number,
      default: 0, // Wird dynamisch basierend auf erfolgreichen Codern berechnet
    },

    status: [
      {
        coder_id: { type: Schema.Types.ObjectId, ref: "Coder" }, // Referenz zum Coder, der sich an der Challenge versucht hat
        status: {
          type: String,
          enum: ["WAITING", "ATTEMPTED", "COMPLETED"],
          default: "WAITING",
        },
      },
    ],
  },
  { timestamps: true }
);

// Challenge Model erstellen und exportieren
const challengeModel = model(DOCUMENT_NAME, challengeSchema, COLLECTION_NAME);
module.exports = challengeModel;

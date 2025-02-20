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
    code: {
      function_name: { type: String, required: true },
      code_text: {
        // made this into an object - no more array - since it can only be either py OR js
        language: { type: String, enum: ["py", "js"], required: true },
        text: { type: String, required: true },
      },

      inputs: [
        {
          name: { type: String },
          type: { type: String, enum: ["number", "string"] },
          value: { type: mongoose.Schema.Types.Mixed },
        },
      ],
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Manager", // Verweis auf den erstellenden Manager
    },
    tests: [
      {
        weight: { type: Number, min: 0, max: 1 },
        inputs: [
          {
            name: { type: String },
            type: { type: String, enum: ["number", "string"] },
            value: { type: mongoose.Schema.Types.Mixed },
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

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";

// Challenge-Dokumenttyp definieren
export type ChallengeDocument = Challenge & Document;

@Schema({ timestamps: true })
export class Challenge {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ["Easy", "Moderate", "Hard"] })
  level: string;

  @Prop({ type: Types.ObjectId, ref: "Manager", required: true }) // Manager-ID aus Token
  manager: Types.ObjectId;

  // Code-Block
  @Prop({
    type: Object,
    required: true,
    validate: {
      validator: (code: any) =>
        typeof code.function_name === "string" &&
        typeof code.code_text === "object" &&
        typeof code.code_text.language === "string" &&
        ["py", "js"].includes(code.code_text.language) &&
        typeof code.code_text.text === "string" &&
        Array.isArray(code.inputs) &&
        code.inputs.every(
          (input: any) =>
            typeof input.name === "string" &&
            ["number", "string"].includes(input.type)
        ),
      message: "Invalid code structure",
    },
  })
  code: {
    function_name: string;
    code_text: {
      language: "py" | "js";
      text: string;
    };
    inputs: {
      name: string;
      type: "number" | "string";
    }[];
  };

  // Test Cases
  @Prop({
    type: [
      {
        weight: { type: Number, min: 0, max: 1, required: true },
        inputs: [
          {
            name: { type: String, required: true },
            value: { type: MongooseSchema.Types.Mixed, required: true },
          },
        ],
        output: { type: MongooseSchema.Types.Mixed, required: true },
      },
    ],
    validate: {
      validator: (tests: any[]) =>
        Array.isArray(tests) &&
        tests.length > 0 &&
        tests.every(
          (test) =>
            typeof test.weight === "number" &&
            test.weight >= 0 &&
            test.weight <= 1 &&
            Array.isArray(test.inputs) &&
            test.inputs.every(
              (input: any) =>
                typeof input.name === "string" &&
                input.value !== undefined
            ) &&
            test.output !== undefined
        ),
      message: "Invalid test cases structure",
    },
  })
  tests: {
    weight: number;
    inputs: { name: string; value: any }[];
    output: any;
  }[];

  // Lösungserfolgsrate
  @Prop({ type: Number, default: 0 })
  solution_rate: number;

  @Prop([
    {
      coder_id: { type: Types.ObjectId, ref: "Coder" },
      status: {
        type: String,
        enum: ["WAITING", "ATTEMPTED", "COMPLETED"],
        default: "WAITING",
      },
    },
  ])
  status: {
    coder_id: Types.ObjectId;
    status: "WAITING" | "ATTEMPTED" | "COMPLETED";
  }[];
}

// Mongoose Schema Factory
export const ChallengeSchema = SchemaFactory.createForClass(Challenge);

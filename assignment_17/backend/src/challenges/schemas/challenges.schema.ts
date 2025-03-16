import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Challenge extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['Easy', 'Moderate', 'Hard'] })
  level: string;

  @Prop({
    type: {
      function_name: { type: String, required: true },
      code_text: {
        language: { type: String, enum: ['py', 'js'], required: true },
        text: { type: String, required: true },
      },
      inputs: [
        {
          name: { type: String },
          type: { type: String, enum: ['number', 'string'] },
          value: { type: MongooseSchema.Types.Mixed },
        },
      ],
    },
  })
  code: {
    function_name: string;
    code_text: {
      language: 'py' | 'js';
      text: string;
    };
    inputs: {
      name: string;
      type: 'number' | 'string';
      value: any;
    }[];
  };

  @Prop({ type: Types.ObjectId, ref: 'Manager' })
  manager: Types.ObjectId;

  @Prop([
    {
      weight: { type: Number, min: 0, max: 1 },
      inputs: [
        {
          name: { type: String },
          type: { type: String, enum: ['number', 'string'] },
          value: { type: MongooseSchema.Types.Mixed },
        },
      ],
      output: { type: MongooseSchema.Types.Mixed, required: true },
    },
  ])
  tests: {
    weight: number;
    inputs: { name: string; type: 'number' | 'string'; value: any }[];
    output: any;
  }[];

  @Prop({ type: Number, default: 0 })
  solution_rate: number;

  @Prop([
    {
      coder_id: { type: Types.ObjectId, ref: 'Coder' },
      status: { type: String, enum: ['WAITING', 'ATTEMPTED', 'COMPLETED'], default: 'WAITING' },
    },
  ])
  status: {
    coder_id: Types.ObjectId;
    status: 'WAITING' | 'ATTEMPTED' | 'COMPLETED';
  }[];
}

// Mongoose Schema Factory
export const ChallengeSchema = SchemaFactory.createForClass(Challenge);

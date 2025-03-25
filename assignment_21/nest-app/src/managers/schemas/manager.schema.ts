import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Manager extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: "https://randomuser.me/api/portraits/lego/1.jpg" })
  avatar: string;

  @Prop({ required: true, enum: ["manager"] })
  role: string;

  @Prop({ default: false })
  is_verified: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Challenge" }] })
  challenges: Types.ObjectId[];
}

// Mongoose Schema Factory
export const ManagerSchema = SchemaFactory.createForClass(Manager);

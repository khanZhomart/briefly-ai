import { Schema, Document } from "mongoose";

export interface UserHistory extends Document {
  userId: number;
  timestamp: Date;
  status: "active" | "ended";
  messages: { sender: "user" | "bot"; content: string }[];
}

export const UserHistorySchema = new Schema({
  userId: Number,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: "active", enum: ["active", "ended"] },
  messages: [
    {
      sender: { type: String, enum: ["user", "bot"] },
      content: String,
    },
  ],
});

export class CreateUserHistoryDto {
  userId: number;
  timestamp?: Date;
  request: string;
  response: string;
}

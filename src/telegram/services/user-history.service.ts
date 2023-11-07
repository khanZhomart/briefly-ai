import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import {
  CreateUserHistoryDto,
  UserHistory,
} from "../../database/schemas/user-history.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserHistoryService {
  constructor(
    @InjectModel("UserHistory") private userHistoryModel: Model<UserHistory>
  ) {}

  async createHistoryEntry(userId: number): Promise<UserHistory> {
    const newEntry = new this.userHistoryModel({
      userId,
      messages: [],
    });
    return newEntry.save();
  }

  async addMessageToConversation(
    userId: number,
    sender: "user" | "bot",
    content: string
  ): Promise<UserHistory> {
    return this.userHistoryModel.findOneAndUpdate(
      { userId: userId, status: "active" },
      { $push: { messages: { sender, content } } },
      { new: true }
    );
  }

  async getHistories(userId: number): Promise<UserHistory[]> {
    return this.userHistoryModel.find({ userId: userId });
  }

  async endCurrentSession(userId: number): Promise<UserHistory> {
    return this.userHistoryModel.findOneAndUpdate(
      { userId: userId, status: "active" },
      { status: "ended" },
      { new: true }
    );
  }
}

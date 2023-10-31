import { Injectable } from "@nestjs/common";
import { GptService } from "./gpt.service";
import { Context } from "@/common/types";
import { Role } from "@webeleon/nestjs-openai";
import { UserHistoryService } from "./user-history.service";

/**
 * Service for connecting GPT and Telegram
 */
@Injectable()
export class GptConversationService {
  constructor(
    private readonly gpt: GptService,
    private readonly userHistory: UserHistoryService
  ) {}

  async handle(ctx: Context, text: string) {
    ctx.session.history.push({ role: Role.USER, text: text });
    await this.userHistory.addMessageToConversation(ctx.from.id, "user", text);

    const response = await this.gpt.resolve(ctx.session.history);
    ctx.session.history.push({ role: Role.ASSISTANT, text: response });
    await this.userHistory.addMessageToConversation(
      ctx.from.id,
      "bot",
      response
    );
    await ctx.reply(response);
  }
}

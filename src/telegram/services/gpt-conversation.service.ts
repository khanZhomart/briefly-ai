import { Injectable } from "@nestjs/common";
import { GptService } from "./gpt.service";
import { Context } from "@/common/types";
import { Role } from "@webeleon/nestjs-openai";

/**
 * Service for connecting GPT and Telegram
 */
@Injectable()
export class GptConversationService {

    constructor(
        private readonly gpt: GptService,
    ) {}

    async handle(ctx: Context, text: string) {
        ctx.session.history.push({ role: Role.USER, text: text })
        const response = await this.gpt.resolve(ctx.session.history)
        ctx.session.history.push({ role: Role.ASSISTANT, text: response })
        await ctx.reply(response)
    }
}

import { OpenAIService } from "@webeleon/nestjs-openai";
import { Ctx, Message, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";

@Update()
export class FooUpdate {
  constructor(private readonly openAI: OpenAIService) {
    this.openAI.openai.timeout = 10000;
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply("Hello, Nest!");
  }

  @On("text")
  async onText(@Ctx() ctx: Context, @Message() message: string) {
    const response = await this.openAI.chat({
      prompt: message,
      userId: ctx.from.id.toString(),
      temperature: 0.1, // 0.1 - more technical, 0.9 - more creative
    });
    await ctx.reply(response[0]);
  }

  @On("document")
  async onDocument(@Ctx() ctx: Context, @Message() message: any) {
    if (message.document) {
      const fileLink = await ctx.telegram.getFileLink(message.document.file_id);

      await ctx.replyWithDocument({
        url: fileLink.href,
        filename: message.document.file_name,
      });
    }
  }
}

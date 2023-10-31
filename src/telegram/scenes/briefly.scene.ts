import {
  Command,
  Ctx,
  Message as Update,
  On,
  Scene,
  SceneEnter,
  SceneLeave,
} from "nestjs-telegraf";

import { Context, ContextDocument } from "@/common/types";
import { Actions, Scenes } from "@/common/constants";
import { ParserService } from "../services/parser.service";
import { GptConversationService } from "../services/gpt-conversation.service";
import { UserHistoryService } from "../services/user-history.service";

/**
 * Scene that asks user to provide text for summarizing.
 */
@Scene(Scenes.BRIEFLY_SCENE)
export class BrieflyScene {
  constructor(
    private readonly conversation: GptConversationService,
    private readonly userHistory: UserHistoryService,
    private readonly parser: ParserService
  ) {}

  @SceneEnter()
  onEnter(ctx: Context): void {
    this.userHistory.endCurrentSession(ctx.from.id);
    this.userHistory.createHistoryEntry(ctx.from.id);
    ctx.reply(Actions.SEND_YOUR_TEXT, { parse_mode: "HTML" });
  }

  @SceneLeave()
  onLeave(ctx: Context): void {
    ctx.session.history = [];
  }

  //   @On("text")
  //   async onText(
  //     @Ctx() ctx: Context,
  //     @Update("text") text: string
  //   ): Promise<void> {
  //     await this.conversation.handle(ctx, text);
  //   }

  @Command("leave")
  async onCommandLeave(ctx: Context): Promise<void> {
    await ctx.scene.leave();
  }

  @Command("history")
  async onHistory(ctx: Context): Promise<void> {
    await ctx.reply(
      (await this.userHistory.getHistories(ctx.from.id)).toString()
    );
  }

  @Command("echo")
  async onCommandEcho(ctx: Context): Promise<void> {
    await ctx.reply("echo!");
  }

  @On("document")
  async onDocument(ctx: ContextDocument): Promise<void> {
    const { document } = ctx.message;

    const fileLink = await ctx.telegram.getFileLink(document.file_id);
    const parse = this.parser.getParser(document.mime_type);
    const text = await parse(fileLink.href);

    await this.conversation.handle(ctx, text);
  }
}

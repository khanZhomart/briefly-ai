import { BRIEFLY_SCENE } from "@/common/constants/scenes";
import { Context, SessionContext } from "@/common/interfaces/context.interface";
import { ParserService } from "@/telegram/parser/parser.service";
import { Command, On, Scene, SceneEnter, SceneLeave } from "nestjs-telegraf";

/**
 * Scene that asks user to provide text for summarizing.
 */
@Scene(BRIEFLY_SCENE)
export class BrieflyScene {
  constructor(private readonly parserService: ParserService) {}

  @SceneEnter()
  onEnter(ctx: Context & SessionContext): string {
    ctx.session.username = ctx.message.from.username;
    return "Scene enter";
  }

  @SceneLeave()
  onLeave(): string {
    return "Scene leave";
  }

  @Command("leave")
  async onCommandLeave(ctx: Context): Promise<void> {
    await ctx.scene.leave();
  }

  @Command("echo")
  async onCommandCum(ctx: Context): Promise<void> {
    await ctx.reply("echo!");
  }

  @On("document")
  async onCommandUpload(ctx: Context): Promise<void> {
    const fileId = (ctx.message as any).document?.file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);

    if ((ctx.message as any).document?.mime_type === "application/pdf") {
      const result = await this.parserService.extractTextFromPDF(fileLink.href);
      console.log(result);
    }
    if (
      (ctx.message as any).document?.mime_type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await this.parserService.extractTextFromDocx(
        fileLink.href
      );
      console.log(result);
    }
    // if ((ctx.message as any).document?.mime_type === "application/msword") {
    //   const result = await this.parserService.extractTextFromDoc(fileLink.href);
    //   console.log(result);
    // }
  }
}

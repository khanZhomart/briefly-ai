import { Command, Ctx, Message as Update, On, Scene, SceneEnter, SceneLeave, Message } from "nestjs-telegraf";

import { Context, HistoryMessage } from "@/common/types";
import { GptService } from "../services/gpt.service";
import { Scenes } from "@/common/constants";
import { Role } from "@webeleon/nestjs-openai";
import { ParserService } from "../services/parser.service";

/**
 * Scene that asks user to provide text for summarizing.
 */
@Scene(Scenes.BRIEFLY_SCENE)
export class BrieflyScene {

    constructor(
        private readonly gpt: GptService,
        private readonly parserService: ParserService
    ) { }

    @SceneEnter()
    onEnter(): string {
        return 'Type your prompt'
    }

    @SceneLeave()
    onLeave(ctx: Context): void {
        ctx.session.history = []
    }

    @On('text')
    async onText(@Ctx() ctx: Context, @Update('text') text: string): Promise<void> {
        await this.conversate(ctx, text)
    }

    @Command('leave')
    async onCommandLeave(ctx: Context): Promise<void> {
        await ctx.scene.leave();
    }

    @Command('echo')
    async onCommandEcho(ctx: Context): Promise<void> {
        await ctx.reply('echo!');
    }

    @On("document")
    async onCommandUpload(ctx: Context): Promise<void> {
        const doc = (ctx.message as any).document;

        if (!doc) {
            return
        };

        const fileLink = await ctx.telegram.getFileLink(doc.file_id);
        const parse = this.parserService.getParser(doc.mime_type);
        const text = await parse(fileLink.href)

        await this.conversate(ctx, text)
    }

    private async conversate(ctx: Context, text: string): Promise<void> {
        ctx.session.history.push({ role: Role.USER, text: text })
        const answer = await this.gpt.resolve(ctx.session.history)
        ctx.session.history.push({ role: Role.ASSISTANT, text: answer })
        ctx.reply(answer)
    }
}
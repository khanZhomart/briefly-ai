import { Command, Ctx, Message as Update, On, Scene, SceneEnter, SceneLeave, Message, TelegrafException } from "nestjs-telegraf";

import { Context, ContextDocument, HistoryMessage } from "@/common/types";
import { GptService } from "../services/gpt.service";
import { Actions, Scenes } from "@/common/constants";
import { Role } from "@webeleon/nestjs-openai";
import { ParserService } from "../services/parser.service";
import { GptConversationService } from "../services/gpt-conversation.service";

/**
 * Scene that asks user to provide text for summarizing.
 */
@Scene(Scenes.BRIEFLY_SCENE)
export class BrieflyScene {

    constructor(
        private readonly conversation: GptConversationService,
        private readonly parser: ParserService,
    ) { }

    @SceneEnter()
    onEnter(ctx: Context): void {
        ctx.reply(Actions.SEND_YOUR_TEXT, { parse_mode: 'HTML' })
    }

    @SceneLeave()
    onLeave(ctx: Context): void {
        ctx.session.history = []
    }

    @On('text')
    async onText(@Ctx() ctx: Context, @Update('text') text: string): Promise<void> {
        await this.conversation.handle(ctx, text)
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
    async onDocument(ctx: ContextDocument): Promise<void> {
        const { document } = ctx.message;

        const fileLink = await ctx.telegram.getFileLink(document.file_id);
        const parse = this.parser.getParser(document.mime_type);
        const text = await parse(fileLink.href);

        await this.conversation.handle(ctx, text);
    }
}
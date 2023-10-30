import { Command, Ctx, Message as Update, On, Scene, SceneEnter, SceneLeave } from "nestjs-telegraf";

import { Context, HistoryMessage } from "@/common/types";
import { GptService } from "../services/gpt.service";
import { Scenes } from "@/common/constants";
import { Role } from "@webeleon/nestjs-openai";
import { ParserService } from "../parser/parser.service";

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
        ctx.session.history.push({ role: Role.USER, text: text })
        const answer = await this.gpt.resolve(ctx.session.history)
        ctx.session.history.push({ role: Role.ASSISTANT, text: answer })
        ctx.reply(answer)
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
        const document = (ctx.message as any).document;
        if (!document) return;

        const fileId = document.file_id;
        const fileLink = await ctx.telegram.getFileLink(fileId);

        const parsers = {
            "application/pdf": this.parserService.extractTextFromPDF,
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": this.parserService.extractTextFromDocx,
            "text/plain": this.parserService.extractTextFromTxt,
            // "application/msword": this.parserService.extractTextFromDoc,
        };

        const parser = parsers[document.mime_type];
        if (parser) {
            const result = await parser(fileLink.href);
            console.log(result);
        } else {
            console.log('Unsupported file type.');
        }
    }


}
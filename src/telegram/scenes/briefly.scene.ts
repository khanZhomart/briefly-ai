import { Command, Ctx, Message as Update, On, Scene, SceneEnter, SceneLeave } from "nestjs-telegraf";

import { Context, HistoryMessage } from "@/common/types";
import { GptService } from "../services/gpt.service";
import { Scenes } from "@/common/constants";
import { Role } from "@webeleon/nestjs-openai";

/**
 * Scene that asks user to provide text for summarizing.
 */
@Scene(Scenes.BRIEFLY_SCENE)
export class BrieflyScene {

    constructor(
        private readonly gpt: GptService,
    ) {}

    @SceneEnter()
    onEnter(): string {
        return 'Scene enter'
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
}
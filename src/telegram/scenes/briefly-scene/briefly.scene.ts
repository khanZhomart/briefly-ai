import { BRIEFLY_SCENE } from "@/common/constants/scenes";
import { Context, SessionContext } from "@/common/interfaces/context.interface";
import { Command, Scene, SceneEnter, SceneLeave } from "nestjs-telegraf";

/**
 * Scene that asks user to provide text for summarizing.
 */
@Scene(BRIEFLY_SCENE)
export class BrieflyScene {

    @SceneEnter()
    onEnter(ctx: Context & SessionContext): string {
        ctx.session.username = ctx.message.from.username
        return 'Scene enter'
    }

    @SceneLeave()
    onLeave(): string {
        return 'Scene leave'
    }

    @Command('leave')
    async onCommandLeave(ctx: Context): Promise<void> {
        await ctx.scene.leave();
    }

    @Command('echo')
    async onCommandCum(ctx: Context): Promise<void> {
        await ctx.reply('echo!');
    }
}
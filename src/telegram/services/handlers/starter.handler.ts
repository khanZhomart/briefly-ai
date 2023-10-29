import { Scenes } from "@/common/constants";
import { Context } from "@/common/types/context.type";
import { Start, Update } from "nestjs-telegraf";

/**
 * Starter handler.
 */
@Update()
export class StarterHandler {

    @Start()
    async onStart(ctx: Context) {
        await ctx.scene.enter(Scenes.BRIEFLY_SCENE)
    }
}

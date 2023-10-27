import { BRIEFLY_SCENE } from "@/common/constants/scenes";
import { Context } from "@/common/interfaces/context.interface";
import { Start, Update } from "nestjs-telegraf";

/**
 * Starter handler.
 */
@Update()
export class StarterUpdate {

    @Start()
    async onStart(ctx: Context) {
        await ctx.scene.enter(BRIEFLY_SCENE)
    }
}

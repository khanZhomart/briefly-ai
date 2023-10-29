import { Module } from "@nestjs/common";
import { BrieflyScene } from "./briefly.scene";
import { ServicesModule } from "../services";
import { OpenAIModule } from "@webeleon/nestjs-openai";

/**
 * A module that wraps up all scenes for further injection.
 */
@Module({
    imports: [ServicesModule, OpenAIModule],
    providers: [BrieflyScene]
})
export class ScenesModule {}

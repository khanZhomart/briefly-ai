import { Module } from "@nestjs/common";
import { BrieflyScene } from "./briefly.scene";
import { ServicesModule } from "../services";
import { OpenAIModule } from "@webeleon/nestjs-openai";
import { ParserModule } from "../parser/parser.module";

/**
 * A module that wraps up all scenes for further injection.
 */
@Module({
    imports: [ServicesModule, OpenAIModule, ParserModule],
    providers: [BrieflyScene]
})
export class ScenesModule {}

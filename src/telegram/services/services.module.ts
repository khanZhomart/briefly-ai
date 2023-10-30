import { Module } from "@nestjs/common";
import { OpenAIModule } from "@webeleon/nestjs-openai";
import { GptService } from "./gpt.service";
import { ParserService } from "./parser.service";

@Module({
    imports: [OpenAIModule],
    providers: [GptService, ParserService],
    exports: [GptService, ParserService],
})
export class ServicesModule {}

import { Module } from "@nestjs/common";
import { OpenAIModule } from "@webeleon/nestjs-openai";
import { GptService } from "./gpt.service";
import { ParserService } from "./parser.service";
import { GptConversationService } from "./gpt-conversation.service";

@Module({
    imports: [OpenAIModule],
    providers: [GptService, ParserService, GptConversationService],
    exports: [GptService, ParserService, GptConversationService],
})
export class ServicesModule {}

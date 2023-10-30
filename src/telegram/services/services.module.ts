import { Module } from "@nestjs/common";
import { OpenAIModule } from "@webeleon/nestjs-openai";
import { GptService } from "./gpt.service";

@Module({
    imports: [OpenAIModule],
    providers: [GptService],
    exports: [ GptService],
})
export class ServicesModule {}

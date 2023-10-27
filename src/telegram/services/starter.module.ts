import { Module } from "@nestjs/common";
import { StarterUpdate } from "./starter.update";
import { OpenAIModule } from "@webeleon/nestjs-openai";

@Module({
    providers: [StarterUpdate]
})
export class StarterModule {}
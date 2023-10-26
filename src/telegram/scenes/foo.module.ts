import { Module } from "@nestjs/common";
import { FooUpdate } from "./foo.update";
import { OpenAIModule } from "@webeleon/nestjs-openai";

@Module({
  providers: [FooUpdate],
  imports: [OpenAIModule],
})
export class FooModule {}

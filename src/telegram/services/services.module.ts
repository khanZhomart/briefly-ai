import { Module } from "@nestjs/common";
import { OpenAIModule } from "@webeleon/nestjs-openai";
import { GptService } from "./gpt.service";
import { ParserService } from "./parser.service";
import { GptConversationService } from "./gpt-conversation.service";
import { UserHistoryService } from "./user-history.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserHistorySchema } from "@/database/schemas/user-history.schema";

@Module({
  imports: [
    OpenAIModule,
    MongooseModule.forFeature([
      { name: "UserHistory", schema: UserHistorySchema },
    ]),
  ],
  providers: [
    GptService,
    ParserService,
    GptConversationService,
    UserHistoryService,
  ],
  exports: [
    GptService,
    ParserService,
    GptConversationService,
    UserHistoryService,
  ],
})
export class ServicesModule {}

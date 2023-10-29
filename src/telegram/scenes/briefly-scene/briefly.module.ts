import { Module } from "@nestjs/common";
import { BrieflyScene } from "./briefly.scene";
import { ParserService } from "@/telegram/parser/parser.service";

@Module({
  providers: [BrieflyScene, ParserService],
})
export class BrieflyModule {}

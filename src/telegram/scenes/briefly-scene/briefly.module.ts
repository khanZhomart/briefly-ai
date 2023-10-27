import { Module } from "@nestjs/common";
import { BrieflyScene } from "./briefly.scene";

@Module({
    providers: [BrieflyScene]
})
export class BrieflyModule {}

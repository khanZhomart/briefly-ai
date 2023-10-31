import { Module } from "@nestjs/common";
import { BrieflyScene } from "./briefly.scene";
import { ServicesModule } from "../services";

/**
 * A module that wraps up all scenes for further injection.
 */
@Module({
    imports: [ServicesModule],
    providers: [BrieflyScene]
})
export class ScenesModule { }

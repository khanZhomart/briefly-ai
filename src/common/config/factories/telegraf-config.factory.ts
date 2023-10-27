import { BrieflyModule } from "@/telegram/scenes/briefly-scene/briefly.module";
import { StarterModule } from "@/telegram/services/starter.module";
import { ConfigService } from "@nestjs/config";
import { TelegrafModuleOptions } from "nestjs-telegraf";
import { session } from "telegraf";

export default (configService: ConfigService): TelegrafModuleOptions => ({
    token: configService.get('telegram.key'),
    include: [StarterModule, BrieflyModule],
    middlewares: [session()]
})
import { FooModule } from "@/telegram/scenes/foo.module";
import { ConfigService } from "@nestjs/config";
import { TelegrafModuleOptions } from "nestjs-telegraf";

export default (configService: ConfigService): TelegrafModuleOptions => ({
    token: configService.get('telegram.key'),
    include: [FooModule]
})
import { TelegrafModuleOptions } from "nestjs-telegraf";
import { session } from "telegraf";

import { ConfigService } from "@nestjs/config";

export default (configService: ConfigService): TelegrafModuleOptions => ({
    token: configService.get('telegram.key'),
    middlewares: [
        session({
            defaultSession: () => ({ history: [] }) 
        })
    ]
})
import { TelegrafModuleOptions } from "nestjs-telegraf";
import { session } from "telegraf";

import { ConfigService } from "@nestjs/config";
import { SessionData } from "@/common/types";

const initialState: SessionData = {
    history: [],
    temp: {
        status: 'ready',
        messageId: -1,
    }
}

export default (configService: ConfigService): TelegrafModuleOptions => ({
    token: configService.get('telegram.key'),
    middlewares: [
        session({ defaultSession: () => initialState })
    ]
})
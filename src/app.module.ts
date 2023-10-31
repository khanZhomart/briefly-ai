import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenAIModule } from '@webeleon/nestjs-openai';
import { TelegrafModule } from 'nestjs-telegraf';
import { configFactory, openaiConfigFactory, telegrafConfigFactory } from './common/config/factories';
import { ScenesModule } from './telegram/scenes/scenes.module';
import { ServicesModule } from './telegram/services/services.module';
import { HandlersModule } from './telegram/services/handlers';
import { APP_FILTER } from '@nestjs/core';
import { TelegramExceptionFilter } from './common/filters/telegram-exception.filter';
import { GptTokenExceptionFilter } from './common/filters/gpt-token-exception.filter';

@Module({
    imports: [
        ServicesModule,
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/resources/.${process.env.NODE_ENV}.env`,
            load: [configFactory]
        }),
        OpenAIModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: openaiConfigFactory,
        }),
        TelegrafModule.forRootAsync({
            imports: [ConfigModule, HandlersModule, ScenesModule],
            inject: [ConfigService],
            useFactory: telegrafConfigFactory,
        }),
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: TelegramExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: GptTokenExceptionFilter,
        }
    ]
})
export class AppModule { }

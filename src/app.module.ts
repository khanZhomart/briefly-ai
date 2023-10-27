import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenAIModule } from '@webeleon/nestjs-openai';
import { TelegrafModule } from 'nestjs-telegraf';
import { StarterModule } from './telegram/services/starter.module';
import { configFactory, openaiConfigFactory, telegrafConfigFactory } from './common/config/factories';
import { BrieflyModule } from './telegram/scenes/briefly-scene/briefly.module';

@Module({
    imports: [
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
            imports: [ConfigModule, StarterModule, BrieflyModule],
            inject: [ConfigService],
            useFactory: telegrafConfigFactory,
        }),
    ],
})
export class AppModule {}

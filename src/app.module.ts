import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenAIModule } from '@webeleon/nestjs-openai';
import { TelegrafModule } from 'nestjs-telegraf';
import { configFactory, openaiConfigFactory, telegrafConfigFactory } from './common/config/factories';
import { ScenesModule } from './telegram/scenes/scenes.module';
import { ServicesModule } from './telegram/services/services.module';
import { HandlersModule } from './telegram/services/handlers';
import { ParserModule } from './telegram/parser/parser.module';


@Module({
    imports: [
        ParserModule,
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
})
export class AppModule {}

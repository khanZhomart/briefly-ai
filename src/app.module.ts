import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenAIModule } from '@webeleon/nestjs-openai';
import { TelegrafModule } from 'nestjs-telegraf';
import { FooModule } from './telegram/scenes/foo.module';
import { configFactory, openaiConfigFactory, telegrafConfigFactory } from './common/config/factories';

const ENV = process.env.NODE_ENV

@Module({
    imports: [
        FooModule,
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/resources/.${ENV ? 'env' : `${ENV}.env`}`,
            load: [configFactory]
        }),
        OpenAIModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: openaiConfigFactory,
        }),
        TelegrafModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: telegrafConfigFactory,
        }),
    ],
})
export class AppModule {}

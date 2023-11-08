import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { OpenAIModule } from "@webeleon/nestjs-openai";
import { TelegrafModule } from "nestjs-telegraf";
import { APP_FILTER } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";

import {
  configFactory,
  openaiConfigFactory,
  telegrafConfigFactory,
  mongodbConfigFactory,
} from "./common/config/factories";
import { TelegramExceptionFilter, GptTokenExceptionFilter } from "./common/filters"
import { HandlersModule } from "./telegram/services/handlers";
import { ServicesModule } from "./telegram/services";
import { ScenesModule } from "./telegram/scenes";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Module({
  imports: [
    ServicesModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/resources/.${process.env.NODE_ENV}.env`,
      load: [configFactory],
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongodbConfigFactory,
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
    },
  ],
})
export class AppModule {}

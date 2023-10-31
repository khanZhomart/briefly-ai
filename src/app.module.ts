import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { OpenAIModule } from "@webeleon/nestjs-openai";
import { TelegrafModule } from "nestjs-telegraf";
import {
  configFactory,
  openaiConfigFactory,
  telegrafConfigFactory,
} from "./common/config/factories";
import { ScenesModule } from "./telegram/scenes/scenes.module";
import { ServicesModule } from "./telegram/services/services.module";
import { HandlersModule } from "./telegram/services/handlers";
import { APP_FILTER } from "@nestjs/core";
import { TelegramExceptionFilter } from "./common/filters/telegram-exception.filter";
import { GptExceptionFilter } from "./common/filters/gpt-exception.filter";
import { MongooseModule } from "@nestjs/mongoose";
import mongodbConfigFactory from "./common/config/factories/mongodb-config.factory";

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
      useClass: GptExceptionFilter,
    },
  ],
})
export class AppModule {}

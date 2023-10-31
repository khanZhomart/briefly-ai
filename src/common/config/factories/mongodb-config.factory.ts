import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export default (configService: ConfigService): MongooseModuleOptions => ({
  uri: configService.get<string>("MONGO_URI"),
  retryAttempts: 5,
  retryDelay: 3000,
});

import { ConfigService } from "@nestjs/config";
import { OpenAIModuleOptions } from "@webeleon/nestjs-openai";

export default (configService: ConfigService): OpenAIModuleOptions => ({
  apiKey: configService.get("openai.key"),
  model: configService.get("openai.model"),
});

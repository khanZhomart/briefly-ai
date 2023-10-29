import { Module } from "@nestjs/common";
import { StarterHandler } from "./starter.handler";

@Module({
    providers: [StarterHandler],
})
export class HandlersModule {}
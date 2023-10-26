import { Module } from "@nestjs/common";
import { FooUpdate } from "./foo.update";

@Module({
    providers: [FooUpdate]
})
export class FooModule {}
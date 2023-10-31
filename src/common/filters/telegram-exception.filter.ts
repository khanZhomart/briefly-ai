import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { TelegrafException } from "nestjs-telegraf";
import { Context } from "../types";

@Catch(TelegrafException)
export class TelegramExceptionFilter implements ExceptionFilter {

    catch(exception: TelegrafException, host: ArgumentsHost) {
        const { message } = exception
        const ctx = host.getArgs()[0] as Context
        const text = `Unhandled Error: ${message}`

        if (ctx) {
            ctx.reply(text)
        }
    }
}
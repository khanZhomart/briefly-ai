import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Context } from "../types";
import { GptTokenException } from "../exceptions";

@Catch(GptTokenException)
export class GptTokenExceptionFilter implements ExceptionFilter {

    catch(exception: GptTokenException, host: ArgumentsHost) {
        const { length } = exception
        const ctx = host.getArgs()[0] as Context
        const text = `<b>Ошибка!</b>\n\nРазмер контекста беседы превысил допустимые значения. (${length})`

        if (ctx) {
            ctx.reply(text, { parse_mode: 'HTML' })
        }
    }
}

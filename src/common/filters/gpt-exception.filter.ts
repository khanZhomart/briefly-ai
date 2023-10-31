import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Context } from "../types";
import { GptTokenException } from "../exceptions";

@Catch(GptTokenException)
export class GptExceptionFilter implements ExceptionFilter {

    catch(exception: GptTokenException, host: ArgumentsHost) {
        const { length } = exception
        const ctx = host.getArgs()[0] as Context
        const text = `<b>Error</b>\n\nContext size exceeded 16K token limit (${length})`
        ctx.reply(text, { parse_mode: 'HTML' })
    }
}

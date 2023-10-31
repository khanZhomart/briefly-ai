import { HttpException } from "@nestjs/common";

export class GptTokenException extends HttpException {
    readonly length: number

    constructor(
        length: number,
        message?: string,
    ) {
        super(message, 400)
        this.length = length
    }
}
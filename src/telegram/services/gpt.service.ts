import { Injectable } from "@nestjs/common";
import { Message, OpenAIService, Role } from "@webeleon/nestjs-openai";
import { randomUUID } from "crypto";

import { GptHistoryMessage, HistoryMessage } from "@/common/types";
import { Prompts } from "@/common/constants";
import * as tokenzr from '../utils/token.util'

@Injectable()
export class GptService {

    constructor(
        private readonly openai: OpenAIService,
    ) {}

    async resolve(history: HistoryMessage[]): Promise<string> {
        const messages: GptHistoryMessage[] = history.map(({ role, text }) => ({ role: role, textChunks: tokenzr.encodeToChunks(text) }))
        const payload: Message[] = this.transform(messages)
        const response: string[] = await this.handle(payload)
        return response[0]
    }

    private transform(chunks: GptHistoryMessage[]): Message[] {
        return chunks.reduce((current: Message[], message, _) => {
            const parts: Message[] = message.textChunks.map(tokens => ({ role: message.role, content: tokenzr.decode(tokens) }))
            return current.concat(parts)
        }, [])
    }

    private async handle(messages: Message[]): Promise<string[]> {
        return await this.openai.chat({
            userId: randomUUID(),
            prompt: '',
            history: [
                { role: Role.SYSTEM, content: Prompts.RESEARCHER },
                ...messages
            ],
        })
    }
}
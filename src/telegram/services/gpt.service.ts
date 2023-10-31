import { Injectable } from "@nestjs/common";
import { Message, OpenAIService, Role } from "@webeleon/nestjs-openai";
import { randomUUID } from "crypto";

import { GptHistoryMessage, HistoryMessage } from "@/common/types";
import { GptTokenException } from "@/common";
import { Prompts } from "@/common/constants";
import * as tokenzr from '../utils/token.util'
import { Gpt } from "@/common/constants/gpt.enum";

@Injectable()
export class GptService {

    constructor(
        private readonly openai: OpenAIService,
    ) {}

    async resolve(history: HistoryMessage[]): Promise<string> {
        const messages: GptHistoryMessage[] = history.map(({ role, text }) => ({ role: role, textChunks: tokenzr.encodeToChunks(text) }))
        const contextLength = this.getContextLength(messages)

        if (contextLength > Gpt.LIMIT_16K) {
            throw new GptTokenException(contextLength)
        }

        const payload: Message[] = this.transform(messages)
        const response: string[] = await this.handle(payload)
        return response[0]
    }

    private getContextLength(messages: GptHistoryMessage[]) {
        const getChunksLength = (chunks: number[][]) => chunks.reduce((total, current, _) => total + current.length, 0)
        return messages.reduce((total, current, _) => total + getChunksLength(current.textChunks), 0)
    }

    private transform(chunks: GptHistoryMessage[]): Message[] {
        return chunks.reduce((total: Message[], current, _) => {
            const parts: Message[] = current.textChunks.map(tokens => ({ role: current.role, content: tokenzr.decode(tokens) }))
            return total.concat(parts)
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
            temperature: 0.7
        })
    }
}
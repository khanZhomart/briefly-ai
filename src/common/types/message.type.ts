import { Role } from "@webeleon/nestjs-openai"

type ChatMessage = {
    text: string,
}

type GptMessage = {
    textChunks: number[][],
}

type BaseRole = {
    role?: Role,
}

export type HistoryMessage = ChatMessage & BaseRole

export type GptHistoryMessage = GptMessage & BaseRole

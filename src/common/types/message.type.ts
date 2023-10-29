import { Role } from "@webeleon/nestjs-openai"

export type HistoryMessage = {
    role?: Role,
    text: string,
}

export type GptHistoryMessage = {
    role?: Role,
    textChunks: number[][],
}

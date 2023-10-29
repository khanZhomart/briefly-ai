import { Message } from "@webeleon/nestjs-openai"

export type Prompt = {
    history: Message[],
    text: string,
}

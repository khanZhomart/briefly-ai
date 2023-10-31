import { Models } from "@webeleon/nestjs-openai";

export default () => ({
    NODE_ENV: process.env.NODE_ENV,
    openai: {
        key: process.env.OPENAI_API_KEY,
        model: Models.GPT3_5_TURBO_16k,
    },
    telegram: {
        key: process.env.TELEGRAM_API_KEY,
    },
})
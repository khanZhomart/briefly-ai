
export default () => ({
    NODE_ENV: process.env.NODE_ENV,
    openai: {
        key: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_GPT_MODEL,
    },
    telegram: {
        key: process.env.TELEGRAM_API_KEY,
    },
})
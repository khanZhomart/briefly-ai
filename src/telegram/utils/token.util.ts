import * as gptt from 'gpt-tokenizer'

export const encodeToChunks = (text: string, chunkSize: number = 500): number[][] => {
    const tokens: number[] = gptt.encode(text)

    if (tokens.length <= chunkSize) {
        return [tokens]
    }

    return tokens.reduce((chunks: number[][], _, index) => {
        if (index % chunkSize === 0) {
            chunks.push(tokens.slice(index, index + chunkSize))
        }
        return chunks
    }, [])
}

export const decodeFromChunks = (chunks: number[][]): string => {
    return null
}

export const encode = (text: string): number[] => {
    return gptt.encode(text)
}

export const decode = (tokens: number[]): string => {
    return gptt.decode(tokens)
}

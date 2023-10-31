export type Parser = {
    (url: string): Promise<string>
}

export const cutTextForSmsIR = (sampleText: string) => {
    return sampleText?.length > 25 ? sampleText?.slice(0, 25) : sampleText
}
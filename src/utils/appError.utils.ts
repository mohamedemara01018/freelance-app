


export interface appErrorProbs {
    statusCode: number,
    message: string,
    statusText: string
}
export const appError = ({ statusCode, message, statusText }: appErrorProbs) => {

    return {
        statusCode,
        message,
        statusText,
    }

}
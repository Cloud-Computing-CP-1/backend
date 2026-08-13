import { response, type Response } from "express"
export const SucessMessage = (res: Response, StausCode: number, messagae: string, data?: any) => {
    return res.status(StausCode).json({
        Status: true,
        Sendmessage: messagae,
        responseData: data
    })
}
export const ErrorMessage = (res: Response, StausCode: number, messagae: string, data?: any) => {
    return res.status(StausCode).json({
        Status: false,
        Sendmessage: messagae,
        responseData: data
    })

}
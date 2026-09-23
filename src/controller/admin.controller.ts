import { getAllCloude_Provider, stop_Provider_db } from "../model/admin.provider.js";
import { ErrorMessage, SucessMessage } from "../utils/Response.js";
import { type Request, type Response } from "express"
export const getAllCloude_Providers = async (req: Request, res: Response) => {
    try {
        const allCloud_provider_data = await getAllCloude_Provider()
        return SucessMessage(res, 200, "Provder fetch sucesfully", allCloud_provider_data)
    } catch (error) {
        return ErrorMessage(res, 503, "Service not unAvailable")
    }
}
export const is_stop_start_Providers = async (req: Request, res: Response) => {
    try {
        const { id, isenable } = req.body
        const allCloud_provider_data = await stop_Provider_db(id, isenable)
        return SucessMessage(res, 200, "Provder fetch sucesfully", allCloud_provider_data)
    } catch (error) {
        console.log(error)
        return ErrorMessage(res, 503, "Service not unAvailable")
    }
}
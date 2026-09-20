import { AddEnvto_DB, getProjectEnv } from "../model/users.projects.js";
import { ErrorMessage, SucessMessage } from "../utils/Response.js";
import { type Request, type Response } from "express"
export const CreateEnv = async(req: Request, res: Response) => {
    try {
        const { project_id, env } = req.body;
        await AddEnvto_DB(project_id,env)
        return SucessMessage(res, 200, "Env Save Sucesfully in DB")
    } catch (error) {
        console.log(error)
        return ErrorMessage(res, 503, "Service unAvailble")
    }
}

export const getPorject_env = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id;
        const data = await getProjectEnv(id)
        return SucessMessage(res, 200, "fetch Projectenv", data)
    } catch (error) {
        console.log(error)
        return ErrorMessage(res, 503, "Service is Anvailble")
    }
}
import { type Request, type Response } from "express"
import { ErrorMessage, SucessMessage } from "../utils/Response.js";
import { getCurrentimageRuning_, getProjectEnv } from "../model/users.projects.js";
import { getAllCloude_Provider } from "../model/admin.provider.js";
import { Clud_Provider_Factory_ } from "../service/Cloud_Provider/factory/CloudProviderFactory.js";
import type { DeploymentInput } from "../service/Cloud_Provider/strategies/CloudProviderStrategy.js";

export const DeployAppliation = async (req: Request, res: Response) => {
    try {
        const project_id = req.params?.id!;
        const _image_details_ = await getCurrentimageRuning_(project_id)
        const all_env = await getProjectEnv(project_id)
        const imageUri = _image_details_?.image_uri
        const get_All_Provider = await getAllCloude_Provider()
        const deploymentEnv = all_env.map(({ key, value }) => ({
            name: key,
            value: String(value),
        }));
        const first_name = get_All_Provider.find((p) => p.is_enabled == true)
        const providername = first_name.provider_name;
        console.log(providername)
        const contariner_port = 80
        const statergy = Clud_Provider_Factory_.Create(providername)
        const deploymentInput: DeploymentInput = {
            imageUri,
            project_id,
            env: deploymentEnv,
            contariner_port
        };
        const result = await statergy.deploy(deploymentInput)
        return SucessMessage(res, 200, "Appliation Deployed Succesfully", result)
    } catch (error) {
        console.log(error)
        return ErrorMessage(res, 503, "Service is UNAvaible")
    }
}
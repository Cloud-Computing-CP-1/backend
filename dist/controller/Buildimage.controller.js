import {} from "express";
import axiosInstance from "axios";
import { ErrorMessage, SucessMessage } from "../utils/Response.js";
import { WithRetry } from "../Statergy/WithRetry.js";
import { GithubService } from "../service/Github.service.js";
import { getGithubAccount_id_byUserId, getGithubAccountAccesTokenById } from "../model/user.githubAcount.js";
import { CreateProject } from "../model/users.projects.js";
const api = axiosInstance.create({
    baseURL: "https://image-building-microservice-hanr.vercel.app",
});
export const imageBuildStatus = async (req, res) => {
    try {
        const response = await api.get("/api/builds/" + encodeURIComponent(String(req.params.id)), { timeout: 15000 });
        return SucessMessage(res, 200, "Build status fetched", response.data);
    }
    catch (error) {
        const status = axiosInstance.isAxiosError(error) && error.response?.status === 404 ? 404 : 503;
        return ErrorMessage(res, status, status === 404 ? "Build status not found" : "Unable to check build status");
    }
};
export const imageBuildingEngine = async (req, res) => {
    try {
        const { repo } = req.body;
        const userid = req.ClientData?.id;
        if (!userid) {
            return SucessMessage(res, 401, "unAuthorised_User");
        }
        const data = await WithRetry(async () => {
            const response = await api.post("/api/builds", { repoUrl: repo });
            return response.data;
        });
        const owners = repo.split("/")[3];
        const reponame = repo.split("/")[4].replace(".git", "");
        const { access_token_encrypted } = await getGithubAccountAccesTokenById(userid);
        await GithubService._webhook_register_service(access_token_encrypted, owners, reponame);
        // console.log(await GithubService.getwebhook(access_token_encrypted, owner, reponame))
        return SucessMessage(res, 200, "Image BuildSucessFull", data);
    }
    catch (error) {
        console.log(error);
        return ErrorMessage(res, 503, "Service unAvailable");
    }
};
const QUEUE_URL = process.env.AWS_QUEUE_URI;
export const auto_build_and_deploy = () => {
    try {
        // extract  the depo details  from queue 
        // apply retry and build image 
        // if image build not work not delete the message from the queue put the message in DLQ 
        // send mail to client
        // if image build work delete the message from queue
        // and send update the image data from db and send the image_id 
        // key of row to deployment then deploymemt used this get data from image-table then deploy application and aws or whichevere cloud is available right now
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=Buildimage.controller.js.map
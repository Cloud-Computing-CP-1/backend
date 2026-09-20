import {} from "express";
import axiosInstance from "axios";
import { ErrorMessage, SucessMessage } from "../utils/Response.js";
import { WithRetry } from "../Statergy/WithRetry.js";
import { GithubService } from "../service/Github.service.js";
import { getGithubAccount_id_byUserId, getGithubAccountAccesTokenById } from "../model/user.githubAcount.js";
import { CreateProject, findProjectUpdatecurrimage } from "../model/users.projects.js";
import { CreateImage, getimagesproject } from "../model/user.image.js";
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
        const { repo, repo_id, repo_branch, project_id } = req.body;
        const userid = req.ClientData?.id;
        if (!userid) {
            return SucessMessage(res, 401, "unAuthorised_User");
        }
        const image_Build_start_time = new Date();
        const data = await WithRetry(async () => {
            const response = await api.post("/api/builds", { repoUrl: repo });
            return response.data;
        });
        const image_Build_com_time = new Date();
        const imagetag = data?.image?.tag;
        const image_uri = data?.image?.reference;
        const image_digest = data?.id;
        const status_ = "READY";
        const owners = repo.split("/")[3];
        const reponame = repo.split("/")[4].replace(".git", "");
        const { access_token_encrypted } = await getGithubAccountAccesTokenById(userid);
        await GithubService._webhook_register_service(access_token_encrypted, owners, reponame);
        const image_id = await CreateImage(project_id, repo_id, repo, repo_branch, image_uri, image_digest, imagetag, status_, image_Build_start_time, image_Build_com_time);
        await findProjectUpdatecurrimage(image_id?.id, project_id);
        // console.log(await GithubService.getwebhook(access_token_encrypted, owner, reponame))
        return SucessMessage(res, 200, "Image BuildSucessFull", data);
    }
    catch (error) {
        console.log(error);
        return ErrorMessage(res, 503, "Service unAvailable");
    }
};
export const getAllIMages = async (req, res) => {
    try {
        const id = req.params?.id;
        const getimageofproject = await getimagesproject(id);
        return SucessMessage(res, 200, "fetch data Ssucessfully", getimageofproject);
    }
    catch (error) {
        console.log(error);
        return ErrorMessage(res, 503, "Service is unavaiable");
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
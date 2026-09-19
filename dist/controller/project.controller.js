import {} from "express";
import { getGithubAccount_id_byUserId } from "../model/user.githubAcount.js";
import { ErrorMessage, SucessMessage } from "../utils/Response.js";
import { CreateProject, getAllProject } from "../model/users.projects.js";
export const CreatePorject = async (req, res) => {
    try {
        const { project_name, repo_name, repo_id, repo_owner, repo_branch, repo_email } = req.body;
        const userId = req.ClientData?.id;
        if (!project_name ||
            !repo_name ||
            !repo_id ||
            !repo_owner ||
            !repo_branch ||
            !repo_email) {
            return ErrorMessage(res, 400, "All fields are required");
        }
        const get_github_account_id = await getGithubAccount_id_byUserId(userId);
        if (get_github_account_id == null) {
            return ErrorMessage(res, 401, "Authorised_User");
        }
        const projectCreate = await CreateProject(userId, get_github_account_id, project_name, repo_name, repo_owner, repo_email, repo_id, repo_branch, "AWS");
        return SucessMessage(res, 200, "Project_Created_Sucess_Fully", projectCreate);
    }
    catch (error) {
        console.log(error);
        return ErrorMessage(res, 503, "Service unAvailable");
    }
};
export const GetAllProject = async (req, res) => {
    try {
        const getaProjects = await getAllProject();
        return SucessMessage(res, 200, "fetch all projects", getaProjects);
    }
    catch (error) {
        return ErrorMessage(res, 401, "Service is Anvailble");
    }
};
//# sourceMappingURL=project.controller.js.map
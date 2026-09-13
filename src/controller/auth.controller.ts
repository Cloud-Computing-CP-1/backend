import "dotenv/config"
import { type Request, type Response } from "express"
import { AuthService } from "../service/Auth.service.js";
import { AuthTokenService } from "../auth/Jwt.token.js";
import { ErrorMessage, SucessMessage } from "../utils/Response.js";
import { getGithubAccountAccesTokenById } from "../model/user.githubAcount.js";
import { Octokit } from "octokit";
export const GitAuthPage = async (req: Request, res: Response) => {
    const githubAuthUrl =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${process.env.GITHUB_CLIENT_ID}` +
        `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}` +
        `&scope=read:user%20user:email%20repo`;
    res.redirect(githubAuthUrl);
}

export const GithubCallback = async (req: Request, res: Response) => {
    try {
        const { code } = req.query;
        const response = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: code
                })
            }
        );
        const data = await response.json();
        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${data.access_token}`,
                Accept: "application/vnd.github+json"
            }
        });
        const user = await userResponse.json();
        const access_token = data.access_token!;
        const { name, email, id, login, avatar_url } = user!;
        const userData = {
            username: name,
            email: email
        };

        const githubData = {
            github_id: id,
            username: login,
            avatar_url: avatar_url,
            access_token_encrypted: access_token
        };
        const Userdata = await AuthService.UserRegistration(
            userData,
            githubData
        )
        const token = await AuthTokenService.CreateToken(Userdata)
        res.cookie("Client_token", token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            }
        )
        res.redirect("http://localhost:5173/myDashboard");
    } catch (error) {
      console.log(error)
    }
}


export const getMyProfile = (req: Request, res: Response) => {
    try {
        if (req?.ClientData?.id) {
            const data = {
                id: req.ClientData?.id,
                username: req.ClientData?.username,
                email: req.ClientData?.email
            }
            return SucessMessage(res, 200, "Fetch data SucessFull", data)
        }
        console.log(req?.ClientData?.id)
        return ErrorMessage(res, 401, "Non-Autherised",)
    } catch (error) {
        return ErrorMessage(res, 500, "Internal Server Error")
    }
}

export const getMyRepo = async (req: Request, res: Response) => {
    try {
        const UserId = req.ClientData?.id;
        if (!UserId) {
            return ErrorMessage(res, 401, "User not authenticated")
        }

        const AcessToken = await getGithubAccountAccesTokenById(UserId)
        const token = AcessToken.access_token_encrypted;
        if (!AcessToken) {
            return ErrorMessage(res, 404, "Error Deu to Github Not Connected")
        }
        const octokit = new Octokit({
            auth: token
        })

        const { data: repositories } = await octokit.rest.repos.listForAuthenticatedUser({
            per_page: 100,
            sort: "updated"
        })
        return SucessMessage(res, 200, "Github RepoFetch", repositories)

    } catch (error) {
        console.error("GitHub Error:", error);;
        return ErrorMessage(res, 502, "Internal Server Errors")
    }
}
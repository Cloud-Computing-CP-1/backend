import "dotenv/config"
import { type Request, type Response } from "express"
import { AuthService } from "../service/Auth.service.js";
import { AuthTokenService } from "../auth/Jwt.token.js";
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
        console.log(token)
        res.redirect(process.env.REDIRECT_URL_CLIENT!);
    } catch (error) {

    }
}
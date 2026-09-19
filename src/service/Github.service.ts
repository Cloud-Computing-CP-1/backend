import { Octokit } from "octokit"
import { webhook } from "../controller/auth.controller.js";
export class GithubService {
    static _webhook_register_service = async (AcessToken: string, owner: string, repo: string) => {
        const webhookURL = `${process.env.BACKEND_URI}/api/auth/github/webhook`
        const octokit = new Octokit({
            auth: AcessToken
        })
        const hooks = await octokit.request(
            "GET /repos/{owner}/{repo}/hooks",
            {
                owner,
                repo,
                headers: {
                    "X-GitHub-Api-Version": "2026-03-10"
                }
            }
        );
        const existingHook = hooks.data.find((hook) => {
           return  hook.config.url === webhookURL
        })
        if (existingHook) {
            console.log("Webhook already exists:", existingHook.id);
            return existingHook;
        }
        const res = await octokit.request('POST /repos/{owner}/{repo}/hooks', {
            owner: owner,
            repo: repo,
            name: 'web',
            active: true,
            events: [
                'push',
            ],
            config: {
                url: webhookURL,
                content_type: 'json',
                insecure_ssl: '0'
            },
            headers: {
                'X-GitHub-Api-Version': '2026-03-10'
            }
        })
        return res.data
    }

    static getwebhook = async (
        accessToken: string,
        owner: string,
        repo: string
    ) => {
        const octokit = new Octokit({
            auth: accessToken
        });
        const response = await octokit.request(
            "GET /repos/{owner}/{repo}/hooks",
            {
                owner,
                repo,
                headers: {
                    "X-GitHub-Api-Version": "2026-03-10"
                }
            }
        );

        return response.data;
    }

}
import { Create, findByEmail, } from "../model/user.model.js"
import { GithubAcountCreate, } from "../model/user.githubAcount.js"
import type { GithubAccount } from "../types/GithubAccount.js";
import type { User } from "../types/User.js";
export class AuthService {
    public static async UserRegistration(userdata: Omit<User, "id">, user_from_Github: Omit<GithubAccount, "user_id" | "id">): Promise<User> {
        const userExists = await findByEmail(userdata.email)
        if (userExists == null) {
            const newUser = await Create(userdata)
             await GithubAcountCreate({
                user_id: newUser.id,
                github_id: user_from_Github.github_id,
                username: user_from_Github.username,
                avatar_url: user_from_Github.avatar_url,
                access_token_encrypted: user_from_Github.access_token_encrypted
            });
            return {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username
            };
        }

        return {
            id: userExists.id,
            email: userExists.email,
            username: userExists.username
        }
    }
}
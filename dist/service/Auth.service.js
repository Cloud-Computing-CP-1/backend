import { Create, findByEmail, } from "../model/user.model.js";
import { GithubAcountCreate, } from "../model/user.githubAcount.js";
export class AuthService {
    static async UserRegistration(userdata, user_from_Github) {
        const userExists = await findByEmail(userdata.email);
        if (userExists == null) {
            const newUser = await Create(userdata);
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
        };
    }
}
//# sourceMappingURL=Auth.service.js.map
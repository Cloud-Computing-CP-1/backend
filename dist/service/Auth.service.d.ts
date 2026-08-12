import type { GithubAccount } from "../types/GithubAccount.js";
import type { User } from "../types/User.js";
export declare class AuthService {
    static UserRegistration(userdata: Omit<User, "id">, user_from_Github: Omit<GithubAccount, "user_id" | "id">): Promise<User>;
}
//# sourceMappingURL=Auth.service.d.ts.map
import type { GithubAccount } from "../types/GithubAccount.js";
export declare const GithubAcountCreate: (user_from_Github: Omit<GithubAccount, "id">) => Promise<GithubAccount>;
export declare const getGithubAccountAccesTokenById: (id: number) => Promise<any>;
export declare const getGithubAccount_id_byUserId: (id: number) => Promise<number | null>;
export declare const UpdateAcessTokenOfUser: (id: number, AcessToken: string) => Promise<void>;
//# sourceMappingURL=user.githubAcount.d.ts.map
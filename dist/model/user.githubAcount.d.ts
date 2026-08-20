import type { GithubAccount } from "../types/GithubAccount.js";
export declare const GithubAcountCreate: (user_from_Github: Omit<GithubAccount, "id">) => Promise<GithubAccount>;
export declare const getGithubAccountAccesTokenById: (id: number) => Promise<any>;
//# sourceMappingURL=user.githubAcount.d.ts.map
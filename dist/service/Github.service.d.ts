export declare class GithubService {
    static _webhook_register_service: (AcessToken: string, owner: string, repo: string) => Promise<{
        type: string;
        id: number;
        name: string;
        active: boolean;
        events: string[];
        config: import("@octokit/openapi-types").components["schemas"]["webhook-config"];
        updated_at: string;
        created_at: string;
        url: string;
        test_url: string;
        ping_url: string;
        deliveries_url?: string;
        last_response: import("@octokit/openapi-types").components["schemas"]["hook-response"];
    }>;
    static getwebhook: (accessToken: string, owner: string, repo: string) => Promise<{
        type: string;
        id: number;
        name: string;
        active: boolean;
        events: string[];
        config: import("@octokit/openapi-types").components["schemas"]["webhook-config"];
        updated_at: string;
        created_at: string;
        url: string;
        test_url: string;
        ping_url: string;
        deliveries_url?: string;
        last_response: import("@octokit/openapi-types").components["schemas"]["hook-response"];
    }[]>;
}
//# sourceMappingURL=Github.service.d.ts.map
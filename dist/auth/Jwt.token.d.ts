import type { User } from "../types/User.js";
import "dotenv/config";
export declare class AuthTokenService {
    static CreateToken(userdata: User): Promise<string>;
    static JsonDecoder: (token: string) => User | null;
}
//# sourceMappingURL=Jwt.token.d.ts.map
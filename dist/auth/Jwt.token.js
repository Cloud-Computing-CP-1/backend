import json from "jsonwebtoken";
import "dotenv/config";
const tokensecrete = process.env.JSONWEBTOKEN_SIGN;
export class AuthTokenService {
    static async CreateToken(userdata) {
        const payload = {
            id: userdata.id,
            username: userdata.username,
            email: userdata.email,
        };
        const token = json.sign(payload, tokensecrete);
        return token;
    }
}
//# sourceMappingURL=Jwt.token.js.map
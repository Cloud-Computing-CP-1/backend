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
    static JsonDecoder = (token) => {
        const userdata = json.verify(token, tokensecrete);
        return userdata;
    };
}
//# sourceMappingURL=Jwt.token.js.map
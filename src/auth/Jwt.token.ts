import type { User } from "../types/User.js";
import json from "jsonwebtoken"
import "dotenv/config"
const tokensecrete = process.env.JSONWEBTOKEN_SIGN!;
export class AuthTokenService {
    public static async CreateToken(userdata: User): Promise<string> {
        const payload = {
            id: userdata.id,
            username: userdata.username,
            email: userdata.email,
        }
        const token = json.sign(payload, tokensecrete)
        return token
    }

    public static JsonDecoder = (token: string):User | null => {
        const userdata = json.verify(token, tokensecrete)
        return userdata as User
    }
}
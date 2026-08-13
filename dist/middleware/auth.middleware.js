import {} from "express";
import { AuthTokenService } from "../auth/Jwt.token.js";
export const AuthMiddleWare = async (req, res, next) => {
    try {
        const headerstoken = await req?.headers?.authorization;
        const token = headerstoken?.split(" ")[1];
        console.log(token);
        if (!token) {
            return next();
        }
        const decodeData = AuthTokenService.JsonDecoder(token);
        req.ClientData = {
            id: decodeData?.id,
            username: decodeData?.username,
            email: decodeData?.email,
        };
        return next();
    }
    catch (error) {
        return next();
    }
};
//# sourceMappingURL=auth.middleware.js.map
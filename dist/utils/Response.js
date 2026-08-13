import { response } from "express";
export const SucessMessage = (res, StausCode, messagae, data) => {
    return res.status(StausCode).json({
        Status: true,
        Sendmessage: messagae,
        responseData: data
    });
};
export const ErrorMessage = (res, StausCode, messagae, data) => {
    return res.status(StausCode).json({
        Status: false,
        Sendmessage: messagae,
        responseData: data
    });
};
//# sourceMappingURL=Response.js.map
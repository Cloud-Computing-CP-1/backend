import { type Response } from "express";
export declare const SucessMessage: (res: Response, StausCode: number, messagae: string, data?: any) => Response<any, Record<string, any>>;
export declare const ErrorMessage: (res: Response, StausCode: number, messagae: string, data?: any) => Response<any, Record<string, any>>;
//# sourceMappingURL=Response.d.ts.map
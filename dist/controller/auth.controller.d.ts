import "dotenv/config";
import { type Request, type Response } from "express";
export declare const GitAuthPage: (req: Request, res: Response) => Promise<void>;
export declare const GithubCallback: (req: Request, res: Response) => Promise<void>;
export declare const getMyProfile: (req: Request, res: Response) => Response<any, Record<string, any>>;
//# sourceMappingURL=auth.controller.d.ts.map
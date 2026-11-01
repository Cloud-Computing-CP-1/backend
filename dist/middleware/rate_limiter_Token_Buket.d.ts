import type { Request, Response, NextFunction } from "express";
export declare const BucketRefiler: () => void;
export declare const RateLimitter: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=rate_limiter_Token_Buket.d.ts.map
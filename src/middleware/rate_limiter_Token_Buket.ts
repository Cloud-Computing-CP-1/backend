import type { Request, Response, NextFunction } from "express";
const RATE_LIMITE = 2;
const Bucket: number[] = Array(RATE_LIMITE).fill(Date.now())
export const BucketRefiler = () => {
    if (Bucket.length < RATE_LIMITE) {
        const required_Token = RATE_LIMITE - Bucket.length;
        for (let i = 0; i < required_Token; i++) {
            Bucket.push(Date.now())
        }
    }
}

export const RateLimitter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (Bucket.length > 0) {
        const token = Bucket.shift();
        console.log(`Token ${token} is consumed`);
        res.set('X-RateLimte-Remaing', Bucket.length.toString())
        next();
    } else {
        return res.status(429).set('X-RateLimit-Remaing', '0').set('Retry-after', '3').json({
            message: "To-many-Request && User is temporiory Block",
            Sucess: false
        })
    }
}
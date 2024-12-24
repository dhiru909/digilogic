import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { aj } from "./arcjet";


/**
 * Middleware function to authenticate the user by checking the authorization token in the request header.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  // Extract the authorization token from the request header
//   var ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
// console.log(ip)

    try {
        const result = await aj.protect(req,{
            requested:5
        })
        // console.log(result);
        
        if(result.isDenied() ){
            return next(createHttpError(429, "Please wait"));
        }else{
            next();
        }
    } catch (error) {
        // If the token is expired, return a 401 Unauthorized error
        return next(createHttpError(429, "Please wait"));
    }
};

export default rateLimiter;
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler'
import { Role } from '../models/User'

interface JwtPayload {
    sub: {
        userId: string
        role: Role
    }
}

declare global {
    namespace Express {
        interface Request {
            userId: string
            role: Role
        }
    }
}

export const userAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(req.cookies);
        const token = req.cookies.token
        
        if (!token) {
            throw new AppError(401, 'Authentication required')
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as unknown as JwtPayload
        // const user = await User.findById(decoded.userId).select('-password');

        if (!decoded.sub.userId) {
            throw new AppError(401, 'User not found')
        }

        req.userId = decoded.sub.userId
        req.role = decoded.sub.role
        next()
    } catch (err) {
        next(new AppError(401, 'Authentication required'))
    }
}

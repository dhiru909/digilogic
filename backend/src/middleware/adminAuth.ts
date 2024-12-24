import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler'
import { Role } from '../models/User'
import { config } from '../config/config'

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

export const adminAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies['token']

        if (!token) {
            throw new AppError(401, 'Authentication required')
        }

        const decoded = jwt.verify(
            token,
            config.jwtSecret!
        ) as unknown as JwtPayload
        if (!decoded.sub.userId) {
            throw new AppError(401, 'User not found')
        }

        req.userId = decoded.sub.userId
        req.role = decoded.sub.role
        if (decoded.sub.role == 'ADMIN') {
            next()
        } else {
            next(new AppError(401, 'Not an admin'))
        }
    } catch (err) {
        next(new AppError(401, 'Invalid token'))
    }
}

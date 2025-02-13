// This file contains the controller functions for user operations like creating a new user and logging in an existing user.

import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import userModel from '../models/User'
import bcrypt from 'bcrypt'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { config } from '../config/config'
import { User } from '../types/user'
import { AppError } from '../middleware/errorHandler'
import { asyncHandler } from '../utils/asyncHandler'
import { JobApplication } from '../models/JobApplication'
import { Enquiry } from '../models/Enquiry'
import { WorkshopRegistration } from '../models/WorkshopRegistration'

const generateToken = (userId: string, role: string): string => {
    return sign({ sub: { userId, role } }, config.jwtSecret!, {
        expiresIn: '7d',
        algorithm: 'HS256',
    })
}
const setCookieOptions = {
    httpOnly: false,
    secure: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'none' as const,
    path: '/',
    domain: '.apnavision.in',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}
const setTokenCookie = (res: Response, token: string) => {
    // res.setHeader('Set-Cookie', `token=${token}; Domain=http://www.apnavision.in; Path=/; Expires=Tue, 07 Jan 2025 21:30:44 GMT; SameSite=None`)
    res.cookie('token', token, setCookieOptions)
}

// This function is responsible for creating a new user in the database.
const createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // Validate the request body and files

        const { email, name, password, role, securityNumber } = req.body
        if (!email || !password || !name || !role) {
            throw new AppError(400, 'All fields are required')
        }
        if (role == 'ADMIN' && securityNumber != '321000') {
            throw new AppError(400, 'Security number is incorrect')
        }

        try {
            const user = await userModel.findOne({ email: email })
            // Check if a user with the same email already exists in the database
            // If a user with the same email exists, delete the uploaded file and return a 400 error response

            if (user) {
                const error = new AppError(
                    400,
                    'User Already Exist with this email'
                )
                return next(error)
            }
        } catch (error) {
            return next(createHttpError(500, 'Error while getting user'))
        }

        try {
            // Hash the user's password using bcrypt
            let newUser: User
            const hashedPassword = await bcrypt.hash(password, 10)

            try {
                // Create a new user in the database

                const newUser = await userModel.create({
                    name,
                    email,
                    password: hashedPassword,
                    role: role,
                })

                // Generate a JWT token for the user

                const token = sign(
                    { sub: { userId: newUser._id, role: newUser.role } },
                    config.jwtSecret as string,
                    {
                        algorithm: 'HS256',
                        expiresIn: '7d',
                    }
                )

                // Return the JWT token as the response

                setTokenCookie(res, token)
                res.status(201).json({
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                })
                return
            } catch (error) {
                return next(createHttpError(500, 'Error while creating user'))
            }
        } catch (error) {
            console.log('error', error)
            return next(createHttpError(500, 'Failed while creating user'))
        }
    }
)

// This function is responsible for logging in an existing user.
const loginUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        // Check if all the required fields are present in the request body
        // If any field is missing, throw a 400 error response

        if (!email || !password) {
            throw createHttpError(400, 'All field are required')
        }

        try {
            const user = await userModel.findOne({ email })

            // Check if a user with the same email exists in the database
            // If no user exists, throw a 404 error response

            if (!user) {
                return next(createHttpError(404, 'User not found!'))
            }

            // Compare the provided password with the hashed password stored in the database
            // If the passwords match, generate a JWT token for the user
            // If the passwords do not match, throw a 400 error response

            const isMatch = await bcrypt.compare(password, user?.password!)
            if (!isMatch) {
                return next(createHttpError(400, 'Password incorrect!!'))
            }

            const token = sign(
                { sub: { userId: user._id, role: user.role } },
                config.jwtSecret as string,
                {
                    algorithm: 'HS256',
                    expiresIn: '7d',
                }
            )

            // Return the JWT token as the response

            setTokenCookie(res, token)
            // res.cookie("userData",newUser.toString(),{maxAge:604800,path:'/'});
            // Set the access token cookie with the JWT token
            // The maxAge specifies the duration of the cookie in milliseconds
            // The sameSite attribute is set to "lax" to ensure the cookie is sent
            // with both GET and POST requests initiated from the same origin.
            // The cookie is marked as HTTP only to prevent client-side JavaScript from accessing it.
            // The cookie is also marked as secure to ensure it is only sent over HTTPS.
            // res.cookie("accessToken", token, {
            //     maxAge: 604800000, // 7 days in milliseconds
            //     sameSite: "lax", // Allow the cookie to be sent with both GET and POST requests
            //     httpOnly: false, // Prevent client-side JavaScript from accessing the cookie
            //     // secure: true // Only send the cookie over HTTPS
            // });
            res.status(200).json({
                name: user.name,
                email: user.email,
                role: user.role,
            })
        } catch (error) {
            return next(createHttpError(500, 'Error while getting user'))
        }
    }
)

const getUserDetails = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.userId

        const user = await userModel.findById(userId).select('name email role')

        if (!user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            const applications = await JobApplication.find({
                email: user.email,
            })
                .sort('-appliedDate')
                .populate('jobId', 'title')

            const enquiries = await Enquiry.find({ email: user.email })
                .sort('-createdAt')
                .populate('productId', 'name')

            const workshopRegistrationsRaw = await WorkshopRegistration.find(
                { email: user.email },
                'status workshopId'
            )
                .sort('-createdAt')
                .populate(
                    'workshopId',
                    'title date link duration location status'
                )
            const workshopRegistrations = workshopRegistrationsRaw.map(
                (workshopRegistration) => {
                    const _id = workshopRegistration._id
                    const status = workshopRegistration.status
                    // @ts-ignore
                    const workshopName = workshopRegistration.workshopId.title
                    // @ts-ignore
                    const link =
                        workshopRegistration.status === 'confirmed'
                            ? // @ts-ignore
                              workshopRegistration.workshopId.link
                            : ''
                    // @ts-ignore
                    const date = workshopRegistration.workshopId.date
                    // @ts-ignore
                    const duration = workshopRegistration.workshopId.duration
                    // @ts-ignore
                    const location = workshopRegistration.workshopId.location
                    // @ts-ignore
                    const workshopStatus =
                        // @ts-ignore
                        workshopRegistration.workshopId.status
                    return {
                        _id,
                        status,
                        workshopName,
                        link,
                        date,
                        duration,
                        location,
                        workshopStatus,
                    }
                }
            )
            res.json({
                user,
                applications,
                enquiries,
                workshopRegistrations,
            })
        }
    }
)

// Export the createUser and loginUser functions
const logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie('token')
    res.json({})
})

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.token
    if (!token) {
        throw new AppError(401, 'No token provided')
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as unknown as {
        sub: {
            userId: string
            role: string
        }
    }
    const user = await userModel
        .findById(decoded.sub.userId)
        .select('-password')

    if (!user) {
        throw new AppError(401, 'User not found')
    }

    const newToken = generateToken(user._id, user.role)
    setTokenCookie(res, newToken)

    res.json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    })
})

// Export the createUser and loginUser functions

export { createUser, loginUser, getUserDetails, logout, refreshToken }

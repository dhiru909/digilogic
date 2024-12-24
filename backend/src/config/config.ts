import dotenv from 'dotenv'

dotenv.config()

export const config = {
    port: parseInt(process.env.PORT || '5000', 10),
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ApnaVision',
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    arcjetKey: process.env.ARCJET_KEY,
    arcjetEnv: process.env.ARCJET_ENV,
    s3AccessKey: process.env.S3_ACCESS_KEY_ID,
    s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    s3Region: process.env.S3_REGION,
    s3bucket: process.env.S3_BUCKET,
    jwtSecret: process.env.JWT_SECRET,
} as const

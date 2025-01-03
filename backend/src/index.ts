import express from 'express'
import cors from 'cors'
import path from 'path'
import { config } from './config/config'
import { connectDB } from './config/db'
import { errorHandler } from './middleware/errorHandler'
import { logger } from './utils/logger'
import productRoutes from './routes/products'
import enquiryRoutes from './routes/enquiries'
import jobRoutes from './routes/jobs'
import userRouter from './routes/users'
import cookieParser from 'cookie-parser'
import workshopRoutes from './routes/workshops'
const app = express()
app.use(cookieParser())
// Middleware
var whitelist = [
    'http://localhost:5173',
    'http://api.apnavision.in',
    'http://www.apnavision.in',
    'https://apnavision.in/*',
    'apnavision.in',
    'https://apnavision.in',
]

// Options for the CORS middleware.

var corsOptions = {
    'Access-Control-Allow-Origin': '*',

    credentials: true, // Allow passing of credentials (cookies, authorization headers, etc.) in cross-origin requests.
    origin: function (origin: any, callback: any) {
        // Function to determine if a given origin is allowed.
        if (whitelist.indexOf(origin) !== -1) {
            // If the origin is in the whitelist, allow the request.
            callback(null, true)
        } else {
            // If the origin is not in the whitelist, deny the request.
            callback(new Error('Not allowed by CORS'))
        }
    },
}
app.use(cors(corsOptions))
app.use(express.json())

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/api/products', productRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/auth', userRouter)

app.use('/api/workshops', workshopRoutes)

// Error handling
app.use(errorHandler)

// Start server
const startServer = async () => {
    try {
        await connectDB()
        app.listen(config.port, () => {
            logger.info(
                `Server running in ${config.nodeEnv} mode on port ${config.port}`
            )
        })
    } catch (error) {
        logger.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()

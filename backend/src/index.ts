import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config/config';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import productRoutes from './routes/products';
import enquiryRoutes from './routes/enquiries';
import jobRoutes from './routes/jobs';
import userRouter from './routes/users';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser())
// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/auth',userRouter);
// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
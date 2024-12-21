import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import productRoutes from './routes/products';
import enquiryRoutes from './routes/enquiries';
const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigin
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);
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
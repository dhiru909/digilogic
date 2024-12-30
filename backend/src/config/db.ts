import mongoose from 'mongoose';
import { config } from './config';
import { logger } from '../utils/logger';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// import { Sequelize } from 'sequelize';

// import { config } from './config';
// import { logger } from '../utils/logger';

// const sequelize = new Sequelize(config.postgresUri!, {
//   dialect: 'postgres',
//   dialectOptions: {
//     useUTC: false, // for reading from database
//   },
//   timezone: '-05:00', // for writing to database
// });

// export const connectDB = async (): Promise<void> => {
//   try {
//     await sequelize.authenticate();
//     logger.info('PostgreSQL connected successfully');
//   } catch (error) {
//     logger.error('PostgreSQL connection error:', error);
//     process.exit(1);
//   }
// };
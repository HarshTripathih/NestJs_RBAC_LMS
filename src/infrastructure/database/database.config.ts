// src/infrastructure/database/database.config.ts
import * as dotenv from 'dotenv';

dotenv.config();

export const DatabaseConfig = {
  type: process.env.DB_TYPE || 'mongo',

  sql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },

  mongo: {
    uri: process.env.MONGO_URI,
  },
};

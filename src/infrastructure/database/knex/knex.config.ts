// src/infrastructure/database/knex/knex.config.ts
import { Knex } from 'knex';
import { DatabaseConfig } from '../database.config';

export const knexConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: DatabaseConfig.sql.host,
    user: DatabaseConfig.sql.user,
    password: DatabaseConfig.sql.pass,
    database: DatabaseConfig.sql.name,
  },
  pool: { min: 2, max: 10 },
};

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { envs } from './utils/envVars';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_DBNAME,
  synchronize: false,
  logging: true,
  entities: [__dirname + '/entity/**/*.{ts,js}'],
  // entities: [SesCategory],

  migrations: [__dirname + '/migration/**/*.{ts,js}'],
  subscribers: [],
});

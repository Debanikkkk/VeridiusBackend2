// import * as dotenv from 'dotenv';
import * as dotenv from 'dotenv';
// import * as doten
interface EnvVars {
  PORT: number;
  SOCKETIO_PORT: number;
  TCP_PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DBNAME: string;
  CORS_ALLOWED_ORIGINS: string[];
  JWT_SECRET_KEY: string;
}

const pathExt: string = process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '';
dotenv.config({ path: `.env${pathExt}` });

export const envs: EnvVars = {
  PORT: parseInt(process.env.PORT || '3000'),
  SOCKETIO_PORT: parseInt(process.env.SOCKETIO_PORT || '3001'),
  TCP_PORT: parseInt(process.env.TCP_PORT || '65432'),
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432'),
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_DBNAME: process.env.DB_DBNAME || 'telematics_backend',
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['localhost:3010'] || ['localhost:3000'],
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'jwtsecretkey',
};

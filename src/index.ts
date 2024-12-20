import express, { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { envs } from './utils/envVars';
import cors from 'cors';
import { RegisterRoutes } from './tsoa-auto/routes';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import swaggerJson from './tsoa-auto/swagger.json';
import { ResponseError } from './models/res/ResErrors';
import * as fs from 'fs';
import { updateStatusCron } from './cronjob';
// import { tcpServer } from '../tcp-server';
import { initSocketIOFeatures } from './tcp-server';
import http from 'http';

// Initialize database and start server
AppDataSource.initialize()
  .then(async () => {
    AppDataSource.runMigrations({ transaction: 'each' });

    const app = express();
    const server: http.Server = http.createServer(app);

    // CORS options
    const allowedOrigins = [
      ...envs.CORS_ALLOWED_ORIGINS,
      'http://localhost:3000',
      'http://localhost:8081',
      'http://localhost:3001',
      'https://chronicpestcontrolagencies.org',
    ];
    const options: cors.CorsOptions = { origin: allowedOrigins };
    initSocketIOFeatures(server);
    // Create uploads directory if it doesn’t exist
    const dir = './public/uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const ecudir = './public/ecuUploads/';
    if (!fs.existsSync(ecudir)) fs.mkdirSync(ecudir, { recursive: true });

    app.use(cors(options));
    app.use(bodyParser.json());
    app.use('/public/uploads', express.static('./public/uploads'));
    app.use('/public/ecuUploads', express.static('./public/ecuUploads'));

    // Swagger docs
    app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => res.send(swaggerUi.generateHTML(swaggerJson)));

    // Register TSOA routes
    RegisterRoutes(app);

    // Error handling
    app.use((err: unknown, req: Request, res: Response, next: NextFunction): Response | void => {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({ message: 'Validation Failed', details: err.fields });
      }
      if (err instanceof ResponseError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      if (err instanceof Error) {
        console.log('Internal Server Error: ', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      next();
    });
    // Start cron job
    updateStatusCron.start();
    // Start Express server
    server.listen(envs.PORT, () => {
      console.log(`Express server has started on port ${envs.PORT}`);
      console.log(`Open http://localhost:${envs.PORT}/docs to see Swagger docs`);
    });
  })
  .catch((error) => console.log(error));

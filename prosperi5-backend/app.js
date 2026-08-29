import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import { pingDatabase } from './config/db.js';
import apiRouter from './routes/api.js';
import { errorHandler, notFoundHandler, asyncHandler } from './utils/errors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, './public');

export function createApp() {
  const app = express();

  app.set('trust proxy', 1);

  // CORS preflight + headers (works even behind Hostinger proxy)
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowed =
      !origin ||
      env.corsOrigins.includes(origin) ||
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

    if (origin && allowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Vary', 'Origin');
    }

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.status(204).end();
    }

    next();
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) return callback(null, true);
        if (env.corsOrigins.includes(origin)) return callback(null, true);
        if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
          return callback(null, true);
        }
        return callback(null, false);
      },
      credentials: true,
    })
  );

  app.use(express.json({ limit: '12mb' }));
  app.use(express.urlencoded({ extended: false, limit: '12mb' }));

  app.get(
    '/api/health',
    asyncHandler(async (req, res) => {
      let dbStatus = 'connected';
      try {
        await pingDatabase();
      } catch (err) {
        dbStatus = `disconnected (${err.message})`;
      }
      res.json({
        success: true,
        data: {
          status: 'ok',
          service: 'prosperi5-careers-api',
          database: dbStatus,
          time: new Date().toISOString(),
        },
      });
    })
  );

  app.use('/api', apiRouter);

  // Serve React Frontend static assets & SPA fallback
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      const indexPath = path.join(publicDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
      }
      next();
    });
  } else {
    app.get('/', (req, res) => {
      res.json({
        success: true,
        service: 'prosperi5-api',
        health: '/api/health',
      });
    });
  }

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}


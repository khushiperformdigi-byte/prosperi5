import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../.env'),
];

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

// Hostinger passes PORT as process.env.PORT (number, string port, or unix socket path)
let rawPort = process.env.PORT || 4000;
let parsedPort = rawPort;
if (typeof rawPort === 'string' && !isNaN(Number(rawPort)) && Number(rawPort) > 0) {
  parsedPort = Number(rawPort);
}

const env = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: parsedPort,
  HOST: process.env.HOST || '0.0.0.0',
  APP_URL: (process.env.APP_URL || 'https://lightsteelblue-wombat-848843.hostingersite.com').replace(/\/$/, ''),
  CORS_ORIGINS:
    process.env.CORS_ORIGINS ||
    'https://lightsteelblue-wombat-848843.hostingersite.com,https://yellow-jaguar-571688.hostingersite.com,http://localhost:5173,http://127.0.0.1:5173,https://www.prosperi5.com,https://prosperi5.com',
  DB_HOST: process.env.DB_HOST || '82.25.121.87',
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_USER: process.env.DB_USER || 'u808577555_pros',
  DB_PASSWORD: process.env.DB_PASSWORD || 'Pros44555',
  DB_NAME: process.env.DB_NAME || 'u808577555_pros',
  JWT_SECRET: process.env.JWT_SECRET || 'prosperi5-jwt-secret-hostinger-production-min-32-chars-default',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '8h',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@prosperi5.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'ChangeMe_StrongPassword123!',
  ADMIN_NAME: process.env.ADMIN_NAME || 'Prosperi5 Admin',
};

env.corsOrigins = env.CORS_ORIGINS.split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

export default env;


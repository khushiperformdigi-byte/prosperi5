import fs from 'node:fs';
import path from 'node:path';
import env from './config/env.js';
import { createApp } from './app.js';
import { pingDatabase } from './config/db.js';

const debugLogPath = path.resolve(process.cwd(), 'server-debug.log');

function logDebug(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  console.log(msg);
  try {
    fs.appendFileSync(debugLogPath, line);
  } catch {}
}

logDebug(`=== Prosperi5 API Server Starting ===`);
logDebug(`Node version: ${process.version}`);
logDebug(`PORT env: ${process.env.PORT || 'undefined (fallback 4000)'}`);
logDebug(`NODE_ENV: ${process.env.NODE_ENV || 'production'}`);
logDebug(`DB_HOST: ${env.DB_HOST}, DB_NAME: ${env.DB_NAME}`);

const app = createApp();

async function verifyDatabase() {
  try {
    await pingDatabase();
    logDebug(`MySQL connected successfully (${env.DB_HOST}/${env.DB_NAME})`);
  } catch (error) {
    logDebug(`MySQL connection warning: ${error.message}`);
    logDebug(`If on Hostinger, ensure DB credentials and database exist in hPanel.`);
  }
}

function start() {
  const onListen = () => {
    logDebug(`Prosperi5 API listening successfully`);
    logDebug(`Health endpoint: ${env.APP_URL}/api/health`);
    verifyDatabase().catch((err) => {
      logDebug(`Background DB verify error: ${err.message}`);
    });
  };

  if (process.env.PORT) {
    logDebug(`Binding to Hostinger process.env.PORT: ${process.env.PORT}`);
    app.listen(process.env.PORT, onListen);
  } else {
    const port = Number(env.PORT) || 4000;
    logDebug(`Binding to TCP 0.0.0.0:${port}`);
    app.listen(port, '0.0.0.0', onListen);
  }
}

process.on('uncaughtException', (error) => {
  logDebug(`Uncaught exception (server keeping alive): ${error?.stack || error}`);
});

process.on('unhandledRejection', (reason) => {
  logDebug(`Unhandled rejection (server keeping alive): ${reason?.stack || reason}`);
});

start();




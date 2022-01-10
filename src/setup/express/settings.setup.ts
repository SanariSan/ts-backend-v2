import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import path from 'node:path';
import type { TEnv } from '../../general.type';

const env = process.env as TEnv;

function setupSettingsExpress(app: Express) {
  const corsUrl = env.NODE_ENV === 'production' ? `${env.CORS_URL_PROD}` : `${env.CORS_URL_DEV}`;

  app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true, parameterLimit: 10 }));
  app.set('env', process.env.NODE_ENV);
  app.set('x-powered-by', false);

  if (env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(env.BUILD_PATH)));
  }
}

export { setupSettingsExpress };

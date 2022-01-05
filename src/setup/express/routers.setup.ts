import type { Express } from 'express';
import type { TApiBranches, TApiVersion } from '../../core/api/express/routers';
import * as apiBranches from '../../core/api/express/routers';

function setupRoutersExpress(app: Express) {
  const apiVersion: TApiVersion = process.env.API_VERSION as TApiVersion;
  app.use(`/${apiVersion}`, (apiBranches as unknown as TApiBranches)[apiVersion]);
}

export { setupRoutersExpress };

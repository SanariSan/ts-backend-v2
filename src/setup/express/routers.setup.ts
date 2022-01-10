import type { Express } from 'express';
import type { TApiBranches, TApiVersion } from '../../logic/express/routers';
import * as apiBranches from '../../logic/express/routers';

function setupRoutersExpress(app: Express) {
  const apiVersion: TApiVersion = process.env.API_VERSION as TApiVersion;
  app.use(`/${apiVersion}`, (apiBranches as unknown as TApiBranches)[apiVersion]);
}

export { setupRoutersExpress };

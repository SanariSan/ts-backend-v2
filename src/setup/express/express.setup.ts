import express from 'express';
import { publishError, publishLog } from '../../access-layer/events/pubsub';
import { ELOG_LEVEL } from '../../general.type';
import { setupErrorHandleExpress } from './error-handler.setup';
import { setupRoutersExpress } from './routers.setup';
import { setupSettingsExpress } from './settings.setup';

export function setupExpress() {
  const app = express();

  setupSettingsExpress(app);
  setupRoutersExpress(app);
  setupErrorHandleExpress(app);

  publishLog(ELOG_LEVEL.WARN, Number(process.env.PORT));

  app
    .listen(Number(process.env.PORT), () => {
      publishLog(ELOG_LEVEL.WARN, `Server running on port : ${process.env.PORT}`);
    })
    .on('error', (e) => {
      publishError(ELOG_LEVEL.WARN, e);
    });
}

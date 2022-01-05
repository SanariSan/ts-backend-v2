import type { Express, NextFunction, Request, Response } from 'express';
import { publishError, publishErrorUnexpected } from '../../access-layer/events/pubsub';
import { ExpressError, handleExpress } from '../../core/api/express/error';
import { ELOG_LEVEL } from '../../general.type';

function setupErrorHandleExpress(app: Express) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // for rare cases when something broke while streaming data to client
    // fallback to default express handler
    if (res.headersSent) {
      next(err);
      return;
    }

    if (err instanceof ExpressError) {
      publishError(ELOG_LEVEL.WARN, err);
      handleExpress(err, res);
      return;
    }

    publishErrorUnexpected(ELOG_LEVEL.ERROR, err);
    next(err);
  });
}

export { setupErrorHandleExpress };

import type { NextFunction, Response } from 'express';
import type { TRequest } from '../../express.type';
import type { TAsyncMWFunction, TSyncMWFunction } from './handle.type';

function asyncHandleMW(asyncCb: TAsyncMWFunction) {
  return (req: TRequest, res: Response, next: NextFunction) => {
    asyncCb(req, res, next).catch(next);
  };
}

function syncHandleMW(syncCb: TSyncMWFunction) {
  return (req: TRequest, res: Response, next: NextFunction) => {
    try {
      syncCb(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
}

export { asyncHandleMW, syncHandleMW };

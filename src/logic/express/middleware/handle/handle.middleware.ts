import type { NextFunction, Request, Response } from 'express';
import type { TRequest } from '../../express.type';
import type { TAsyncMWFunction, TSyncMWFunction } from './handle.type';

function asyncHandleMW<T extends TRequest>(asyncCb: TAsyncMWFunction<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncCb(req as T, res, next).catch(next);
  };
}

function syncHandleMW<T extends TRequest>(syncCb: TSyncMWFunction<T>) {
  return (req: TRequest, res: Response, next: NextFunction) => {
    try {
      syncCb(req as T, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
}

export { asyncHandleMW, syncHandleMW };

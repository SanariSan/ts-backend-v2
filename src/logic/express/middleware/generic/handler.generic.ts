import type { NextFunction, Request, Response } from 'express';
import type { TAsyncMWFunction, TSyncMWFunction } from './generic.type';

function asyncMWHandle(asyncCb: TAsyncMWFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncCb(req, res, next).catch(next);
  };
}

function syncMWHandle(syncCb: TSyncMWFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      syncCb(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
}

export { asyncMWHandle, syncMWHandle };

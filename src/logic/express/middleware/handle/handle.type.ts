import type { NextFunction, Request, Response } from 'express';
import type { TRequest } from '../../express.type';

type TAsyncMWFunction = (req: TRequest, res: Response, next: NextFunction) => Promise<void>;
type TSyncMWFunction = (req: TRequest, res: Response, next: NextFunction) => void;

export type { TAsyncMWFunction, TSyncMWFunction };

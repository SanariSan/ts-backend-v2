import type { NextFunction, Request, Response } from 'express';

type TAsyncMWFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type TSyncMWFunction = (req: Request, res: Response, next: NextFunction) => void;

export type { TAsyncMWFunction, TSyncMWFunction };

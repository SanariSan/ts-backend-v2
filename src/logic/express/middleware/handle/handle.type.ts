import type { NextFunction, Response } from 'express';

type TAsyncMWFunction<T> = (req: T, res: Response, next: NextFunction) => Promise<void>;
type TSyncMWFunction<T> = (req: T, res: Response, next: NextFunction) => void;

export type { TAsyncMWFunction, TSyncMWFunction };

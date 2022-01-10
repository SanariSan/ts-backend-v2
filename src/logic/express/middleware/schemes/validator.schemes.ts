import type { NextFunction, Response } from 'express';
import type Joi from 'joi';
import { validateBySchemaAsync } from '../../../../access-layer/schemes';
import type { TRequest } from '../../express.type';
import { EVALIDATION_TARGET } from './schemes.type';

export function validateBySchemaAsyncMW(
  schema: Joi.ObjectSchema,
  target: EVALIDATION_TARGET = EVALIDATION_TARGET.BODY,
) {
  return async (req: TRequest, res: Response, next: NextFunction) =>
    validateBySchemaAsync(schema, target)
      .then(() => {
        next();
        return;
      })
      .catch((error) => {
        // TODO: error parse + publish
        //
        // ErrorReport
        // const { details } = error as Err;
        //   const a = error as ErrorReport;
        //   const message = details.map((el, i) => `${el.message.replace(/"/g, '')}`).join(';');
        //   Logger.debug(details);
        //   next(new BadRequestError(message));
      });
}

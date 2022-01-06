import type { NextFunction, Request, Response } from 'express';
import type Joi from 'joi';
import { validateBySchemaAsync } from '../../../../core/joi'; // TODO: core import
import { EVALIDATION_TARGET } from './joi.type';

export function validateBySchemaMW(
  schema: Joi.ObjectSchema,
  target: EVALIDATION_TARGET = EVALIDATION_TARGET.BODY,
) {
  return async (req: Request, res: Response, next: NextFunction) =>
    validateBySchemaAsync(schema, target)
      .then(() => {
        next();
        return;
      })
      .catch((error) => {
        // ErrorReport
        // const { details } = error as Err;
        //   const a = error as ErrorReport;
        //   const message = details.map((el, i) => `${el.message.replace(/"/g, '')}`).join(';');
        //   Logger.debug(details);
        //   next(new BadRequestError(message));
      });
}

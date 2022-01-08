import type Joi from 'joi';

export function validateBySchemaAsync(schema: Joi.ObjectSchema, target: unknown) {
  return schema.validateAsync(target, {
    abortEarly: false,
  });
}

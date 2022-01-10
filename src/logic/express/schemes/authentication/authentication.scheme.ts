import Joi from 'joi';

export const SCHEME_AUTHENTICATION = {
  credentials: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  credentialsChange: Joi.object().keys({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  }),
  tokenAccess: Joi.object()
    .keys({
      authorization: Joi.string().custom((value: string, helpers) => {
        if (!value.startsWith('Bearer') || value.split(' ')[1] === '') {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'Authorization Header Validation'),
    })
    .unknown(true),
  tokenRefresh: Joi.object()
    .keys({
      refreshToken: Joi.string().required().min(1),
    })
    .unknown(true),
};

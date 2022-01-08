import Joi from 'joi';
import { isNotEmptyBearerHeader } from '../../custom';

export const SCHEMAS_ACCESS = {
  login: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  signup: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  auth: Joi.object()
    .keys({
      authorization: isNotEmptyBearerHeader().required(),
    })
    .unknown(true),
  refresh: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  changePassword: Joi.object().keys({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  }),
};

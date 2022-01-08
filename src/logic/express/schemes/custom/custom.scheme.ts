import Joi from 'joi';

function isValidUrl() {
  return Joi.string().custom((value: string, helpers) => {
    if (/^(ftp|http|https):\/\/[^ "]+$/.test(value)) return helpers.error('any.invalid');
    return value;
  }, 'Url Endpoint Validation');
}

function isNotEmptyBearerHeader() {
  return Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith('Bearer') || value.split(' ')[1] === '') {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'Authorization Header Validation');
}

export { isValidUrl, isNotEmptyBearerHeader };

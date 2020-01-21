const { badRequest } = require('@hapi/boom');
const joi = require('@hapi/joi');


const sendJSONResponse = (res, status, data, method, message) => {
  res.status(status);
  res.json({
    status,
    method,
    message,
    data,
  });
};

const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);


const validate = (schema, options) => {
  const requestOptions = options || {};

  return function validateRequest(req, res, next) {
    const toValidate = {};
    /* istanbul ignore if */
    if (!schema) {
      return next();
    }

    ['params', 'body', 'query'].forEach((key) => {
      if (schema[key]) {
        toValidate[key] = req[key];
      }
    });

    function onValidationComplete(err, validated) {
      if (err) {
        return next(badRequest(err.message, err.details));
      }

      // copy the validated data to the req object
      Object.assign(req, validated);

      return next();
    }
    return joi.validate(toValidate, schema, requestOptions, onValidationComplete);
  };
};


module.exports = {
  sendJSONResponse,
  catchErrors,
  validate,
};
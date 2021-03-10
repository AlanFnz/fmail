const Joi = require("joi");

const schema = Joi.object().keys({
  isImportant: Joi.boolean().required()
});

module.exports = (req, res, next) => {
  const result = schema.validate(req.body);

  if (result.error) {
    return next(new Error(result.error));
  }

  return next();
};
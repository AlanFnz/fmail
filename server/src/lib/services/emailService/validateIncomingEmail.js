const Joi = require("joi");

const emailSchema = Joi.string().email().max(255);

const schema = Joi.object({
  recipients: Joi.array().min(1).items(emailSchema).required(),
  subject: Joi.string().min(1).max(255).required(),
  message: Joi.string().min(1).max(1000).required()
});

module.exports = (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return next(new Error(result.error));
  }

  return next();
};

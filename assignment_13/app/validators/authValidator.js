const Joi = require("joi");

// VALIDATION WITH JOI LIBRARY

//====================================================
// schema and validator logic for REGISTERING
//====================================================
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next(); // Geht weiter zum Controller, wenn alles ok ist
};

//====================================================
// schema and validator logic for LOGIN
//====================================================
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = { validateRegister, validateLogin };

const Joi = require("joi");

// USER INPUT VALIDATION WITH JOI LIBRARY - Betonung auf USER INPUT
// !!/!/"P()/Z MANCHE DIESER FELDER NOCH RAUS, WENN FRONTEND DAZU KOMMT"
// DENN HIER SOO NUR DER USRE INPUT GECHECKT WERDEN !!!!!!!!!!!!!

//====================================================
// schema and validator logic for REGISTERING
//====================================================
const registerSchema = Joi.object({
  first_name: Joi.string().min(3).max(30).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string()
    .uri()
    .default("https://randomuser.me/api/portraits/lego/1.jpg"),
  role: Joi.string().valid("coder", "manager").required(),
  is_verified: Joi.boolean().default(false),
  description: Joi.string().max(500).allow(null, ""),
  score: Joi.number().integer().min(0).default(0),
  submissions: Joi.array().items(Joi.string().hex().length(24)), // MongoDB ObjectId
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

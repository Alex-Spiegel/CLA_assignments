const Joi = require("joi");

// VALIDATION WITH JOI LIBRARY

//====================================================
// schema and validator logic for POST CHALLENGES
//====================================================
const challengeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  level: Joi.string().valid("Easy", "Moderate", "Hard").required(),
  code: Joi.object({
    function_name: Joi.string().required(),
    code_text: Joi.object({
      // made this into an object - no more array - since it can only be either py OR js
      language: Joi.string().valid("py", "js").required(),
      text: Joi.string().required(),
    }).required(),
    inputs: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        type: Joi.string().valid("number", "string"),
        value: Joi.any(),
      })
    ),
  }).required(),
  manager: Joi.string(),
  tests: Joi.array()
    .items(
      Joi.object({
        weight: Joi.number().min(0).max(1).required(),
        inputs: Joi.array().items(
          Joi.object({
            name: Joi.string(),
            type: Joi.string().valid("number", "string"),
            value: Joi.any(),
          })
        ),
        output: Joi.any().required(),
      })
    )
    .required(),
});

// Validator für die Challenge
const validateChallenge = (req, res, next) => {
  const { error } = challengeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateChallenge };

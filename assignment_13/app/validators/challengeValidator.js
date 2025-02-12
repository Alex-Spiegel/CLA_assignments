const Joi = require("joi");

// VALIDATION WITH JOI LIBRARY

//====================================================
// schema and validator logic for POST CHALLENGES
//====================================================
const challengeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  level: Joi.string().valid("Easy", "Medium", "Hard").required(),
  code: Joi.object({
    function_name: Joi.string().required(),
    code_text: Joi.array()
      .items(
        Joi.object({
          language: Joi.string().valid("js", "py").required(),
          text: Joi.string().required(),
        })
      )
      .required(),
    inputs: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          type: Joi.string().valid("number", "string").required(),
        })
      )
      .required(),
  }).required(),
  tests: Joi.array()
    .items(
      Joi.object({
        weight: Joi.number().min(0).max(1).required(),
        inputs: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              value: Joi.any().required(),
            })
          )
          .required(),
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

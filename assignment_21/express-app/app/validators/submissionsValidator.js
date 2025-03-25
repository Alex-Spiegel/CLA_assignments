const Joi = require("joi");

// VALIDATION WITH JOI LIBRARY

//====================================================
// schema and validator logic für die submissions
//====================================================
// soll checken, ob der Code richtig formatiert ist/ alle Felder vorhanden sind

const submissionSchema = Joi.object({
  challenge_id: Joi.string().required(), // challenge_id muss vorhanden sein
  lang: Joi.string().valid("py", "js"), // brauch ich nicht, da ich die lang aus der challenge ziehe
  code: Joi.string().min(1).required(), // code darf nicht leer sein
});

const validateSubmission = (req, res, next) => {
  const { error } = submissionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next(); // Weiter zur nächsten Funktion, wenn keine Fehler
};

module.exports = { validateSubmission };

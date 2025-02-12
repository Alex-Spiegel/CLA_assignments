const express = require("express");
const router = express.Router();
const submissionsController = require("../controllers/submissionsController");
const { validateSubmission } = require("../validators/submissionsValidator");

// Route für Code-Submission
router.post("/submit", validateSubmission, submissionsController.submitCode);

module.exports = router;

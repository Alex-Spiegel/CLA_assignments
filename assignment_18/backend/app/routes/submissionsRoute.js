const express = require("express");
const router = express.Router();
const submissionsController = require("../controllers/submissionsController");
const { validateSubmission } = require("../validators/submissionsValidator");
const authMiddleware = require("../middlewares/authMiddleware");

// Route für Code-Submission
router.post(
  "/",
  authMiddleware(["coder"]),
  validateSubmission,
  submissionsController.createSubmissionC
);

module.exports = router;

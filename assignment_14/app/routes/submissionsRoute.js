const express = require("express");
const router = express.Router();
const submissionsController = require("../controllers/submissionsController");
const { validateSubmission } = require("../validators/submissionsValidator");
const authMiddleware = require("../middlewares/authMiddleware");

// Route für Code-Submission
router.post(
  "/submit",
  authMiddleware(["coder"]),
  validateSubmission,
  submissionsController.submitCode
);

module.exports = router;

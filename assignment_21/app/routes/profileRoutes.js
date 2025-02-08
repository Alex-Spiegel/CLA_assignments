const express = require("express");
const upload = require("../services/multerService");
const { updateProfile } = require("../controllers/profileController");

const router = express.Router();

router.put("/profile", upload.single("avatar"), updateProfile);

module.exports = router;

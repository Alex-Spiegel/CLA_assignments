const multer = require("multer");

const storage = multer.memoryStorage(); // Datei im RAM speichern (vor Upload)
const upload = multer({ storage: storage });

module.exports = upload;

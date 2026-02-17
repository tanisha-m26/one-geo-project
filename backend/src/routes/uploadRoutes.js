const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadLasFile } = require('../controllers/uploadController');

// Ensure POST URL is /api/upload
router.post('/upload', upload.single('lasFile'), uploadLasFile);

module.exports = router;

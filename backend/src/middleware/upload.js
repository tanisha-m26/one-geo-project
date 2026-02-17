const multer = require('multer');
const path = require('path');

// Memory storage (we can directly send to Backblaze)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.las') {
    return cb(new Error('Only LAS files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

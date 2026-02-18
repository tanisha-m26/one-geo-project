const { uploadFileToB2 } = require('../config/storage');
const parseLAS = require('../utils/lasParser');
const Well = require('../models/wellModel');

const uploadLasFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    // 1. Upload to Backblaze B2
    const storedFileName = await uploadFileToB2(fileBuffer, fileName);

    // 2. Parse LAS file
    const lasString = fileBuffer.toString('utf-8');
    const parsed = parseLAS(lasString);

    // SAFETY CHECK
    if (!parsed || !Array.isArray(parsed.curves)) {
      return res.status(400).json({
        message: 'Invalid LAS parse output',
        debug: parsed
      });
    }

    // 3. Store in MongoDB
    const wellData = new Well({
      fileName: storedFileName,
      curves: parsed.curves.map((c, idx) => ({
        mnemonic: `Curve${idx + 1}`,
        unit: '',
        data: c,
      })),
      headers: parsed.headers || {},
    });

    await wellData.save();

    res.status(200).json({
      message: 'File uploaded and parsed successfully',
      fileId: wellData._id,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({
      message: 'Error uploading file',
      error: err.message,
    });
  }
};

module.exports = { uploadLasFile };

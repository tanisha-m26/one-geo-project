const { uploadFileToB2 } = require('../config/storage');
const parseLAS = require('../utils/lasParser');
const Well = require('../models/wellModel');

const uploadLasFile = async (req, res) => {
  try {
    console.log("📥 Upload request received");

    if (!req.file) {
      console.log("❌ No file in request");
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    console.log("✅ File received:", fileName);

    // 1. Upload to B2
    console.log("⬆ Uploading to B2...");
    const storedFileName = await uploadFileToB2(fileBuffer, fileName);
    console.log("✅ Uploaded to B2:", storedFileName);

    // 2. Parse LAS
    console.log("📊 Parsing LAS...");
    const lasString = fileBuffer.toString('utf-8');
    const parsed = parseLAS(lasString);
    console.log("✅ Parsing complete");

    // Safety check
    if (!parsed || !parsed.curves) {
      console.log("❌ Parse failed");
      return res.status(500).json({ message: "LAS parsing failed" });
    }

    // 3. Save Mongo
    console.log("💾 Saving to Mongo...");
    const wellData = new Well({
      fileName: storedFileName,
      curves: parsed.curves.map((c, idx) => ({
        mnemonic: `Curve${idx + 1}`,
        unit: '',
        data: c,
      })),
      headers: parsed.headers,
    });

    await wellData.save();
    console.log("✅ Mongo save complete");

    return res.status(200).json({
      message: 'File uploaded and parsed successfully',
      fileId: wellData._id,
    });

  } catch (err) {
    console.error("🔥 Upload error:", err);

    return res.status(500).json({
      message: 'Error uploading file',
      error: err.message,
    });
  }
};

module.exports = { uploadLasFile };

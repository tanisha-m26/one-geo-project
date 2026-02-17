// backend/src/routes/visualizationRoutes.js
const express = require('express');
const router = express.Router();

const {
  getWellCurves,
  getCurvesData
} = require('../controllers/visualizationController'); // <-- must match exports

router.get('/curves', getWellCurves);
router.get('/curves-data', getCurvesData);

module.exports = router;

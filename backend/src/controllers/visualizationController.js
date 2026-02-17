// backend/src/controllers/visualizationController.js
const fs = require('fs');
const path = require('path');
const parseLAS = require('../utils/lasParser');

exports.getWellCurves = (req, res) => {
  try {
    const lasFilePath = path.join(__dirname, '../../test.las'); 
    const content = fs.readFileSync(lasFilePath, 'utf-8');
    const { curves } = parseLAS(content);

    res.json({ curveNames: Object.keys(curves) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to parse LAS file' });
  }
};

exports.getCurvesData = (req, res) => {
  try {
    const lasFilePath = path.join(__dirname, '../../test.las');
    const content = fs.readFileSync(lasFilePath, 'utf-8');
    const { depth, curves } = parseLAS(content);

    curves['DEPT'] = depth; // ensure DEPT is included
    res.json(curves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to parse LAS file' });
  }
};

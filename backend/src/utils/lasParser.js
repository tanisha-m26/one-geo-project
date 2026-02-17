// backend/src/utils/lasParser.js
const fs = require('fs');

function parseLAS(lasContent) {
  const lines = lasContent.split(/\r?\n/);
  const curves = {};
  const depth = [];

  let curveNames = [];
  let readingCurves = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Identify ~Curve section (or ~A for ASCII)
    if (trimmed.startsWith('~A') || trimmed.startsWith('~ASCII')) {
      readingCurves = true;
      continue;
    }

    if (trimmed.startsWith('~')) {
      readingCurves = false;
      continue;
    }

    // Parse curve headers if not reading data yet
    if (!readingCurves && trimmed.includes('.')) {
      const parts = trimmed.split('.');
      if (parts.length > 1) {
        const name = parts[0].trim();
        curveNames.push(name);
        curves[name] = [];
      }
      continue;
    }

    // Read curve data
    if (readingCurves) {
      const values = trimmed.split(/\s+/).map(Number);
      values.forEach((v, idx) => {
        if (curveNames[idx]) curves[curveNames[idx]].push(v);
      });
    }
  }

  // Assign depth: first column or DEPT
  if (curves['DEPT']) {
    depth.push(...curves['DEPT']);
  } else {
    depth.push(...Object.values(curves)[0] || []);
  }

  return { depth, curves };
}

module.exports = parseLAS;

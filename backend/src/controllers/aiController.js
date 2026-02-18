const { spawn } = require('child_process');
const path = require('path');

exports.getInterpretation = (req, res) => {
  console.log('Request body:', req.body); // debug

  const py = spawn('python', [
    path.join(__dirname, '../../ai-service/ai_model.py')
  ]);

  // Send input to Python
  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

  let output = '';
  let errors = '';

  py.stdout.on('data', (chunk) => {
    output += chunk.toString();
  });

  py.stderr.on('data', (chunk) => {
    console.error('Python stderr:', chunk.toString());
    errors += chunk.toString();
  });

  py.on('close', (code) => {
    if (errors) {
      return res.status(500).json({ error: 'Python script failed', details: errors });
    }

    try {
      const json = JSON.parse(output);
      res.json(json);
    } catch (err) {
      console.error('Failed to parse Python output:', output);
      res.status(500).json({ error: 'Failed to parse Python output', raw: output });
    }
  });

  py.on('error', (err) => {
    console.error('Spawn error:', err);
    res.status(500).json({ error: 'Failed to start Python process', details: err.message });
  });
};

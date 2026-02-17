const { spawn } = require('child_process');
const path = require('path');

exports.getInterpretation = (req, res) => {
  const py = spawn('python', [
    path.join(__dirname, '../../ai-service/ai_model.py')
  ]);

  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

  let data = '';

  py.stdout.on('data', chunk => {
    data += chunk.toString();
  });

  py.on('close', () => {
    try {
      const parsed = JSON.parse(data);
      res.json(parsed);
    } catch (e) {
      res.status(500).json({ error: "Failed to parse Python output", raw: data });
    }
  });
};

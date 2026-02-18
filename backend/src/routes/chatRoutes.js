const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

router.post('/', (req, res) => {
  const py = spawn('python3', [
    path.join(__dirname, '../../ai-service/chatbot.py') // correct path
  ]);

  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

  let data = '';

  py.stdout.on('data', chunk => {
    data += chunk.toString();
  });

  py.stderr.on('data', chunk => {
    console.error('Chatbot Python error:', chunk.toString());
  });

  py.on('close', () => {
    try {
      const parsed = JSON.parse(data);
      res.json(parsed);
    } catch (e) {
      console.error('Chatbot Python output:', data);
      res.status(500).json({ error: "Failed to parse Python output", raw: data });
    }
  });
});

module.exports = router;

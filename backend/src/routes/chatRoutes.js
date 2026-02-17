const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

router.post('/', (req, res) => {
  const py = spawn('python', [
    path.join(__dirname, '../../ai-service/chatbot.py')
  ]);

  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

  let data = '';

  py.stdout.on('data', chunk => {
    data += chunk.toString();
  });

  py.on('close', () => {
    res.json(JSON.parse(data));
  });
});

module.exports = router;

const { spawn } = require('child_process');

exports.chatbot = async (req, res) => {
  const { question, aiResults, metrics } = req.body;

  const py = spawn('python', ['ai-service/chatbot.py']);

  let data = '';

  py.stdin.write(JSON.stringify({ question, aiResults, metrics }));
  py.stdin.end();

  py.stdout.on('data', chunk => data += chunk);

  py.on('close', () => {
    res.json({ answer: data.toString() });
  });
};

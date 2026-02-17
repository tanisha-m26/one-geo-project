import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = ({ aiResults, metrics }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const ask = async () => {
    const res = await axios.post('/chatbot', {
      question,
      aiResults,
      metrics
    });
    setAnswer(res.data.answer);
  };

  return (
    <div style={{ marginTop: '20px', background: '#eef', padding: '10px' }}>
      <h3>AI Chatbot</h3>

      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask about facies, anomalies, accuracy..."
        style={{ width: '80%' }}
      />

      <button onClick={ask}>Ask</button>

      {answer && (
        <p><b>Answer:</b> {answer}</p>
      )}
    </div>
  );
};

export default Chatbot;

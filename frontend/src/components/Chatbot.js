import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = 'https://one-geo-project.onrender.com';

const Chatbot = ({ aiResults, metrics }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const ask = async () => {
    const res = await axios.post(`${BACKEND_URL}/api/chatbot`, {
      question,
      aiResults,
      metrics
    });
    setAnswer(res.data.answer);
  };

  return (
    <div style={{ marginTop: '20px', background: '#eef', padding: '10px' }}>
      <h3>AI Chatbot</h3>

      <div style={{
        fontSize: '12px',
        marginBottom: '10px',
        background: '#f5f7ff',
        padding: '8px',
        borderRadius: '6px',
        lineHeight: '1.4'
      }}>
        <b>Ask about:</b><br/>
        • facies zones<br/>
        • anomalies<br/>
        • hydrocarbon / pay zones<br/>
        • clustering<br/>
        • model accuracy or F1 score<br/>
        • AI interpretation summary<br/>
        <i>Example: “How many facies?”, “Any hydrocarbons?”, “What is accuracy?”</i>
      </div>


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

const express = require('express');
const app = express();
const visualizationRoutes = require('./routes/visualizationRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use(express.json());

app.use('/api/visualization', visualizationRoutes);
app.use('/api/interpret', aiRoutes);
app.use('/api/chatbot', require('./routes/chatRoutes'));


module.exports = app;

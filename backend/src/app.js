const express = require('express');
const cors = require('cors');
const app = express();

// Routes
const uploadRoutes = require('./routes/uploadRoutes');

const visualizationRoutes = require('./routes/visualizationRoutes');
const aiRoutes = require('./routes/aiRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS configuration
app.use(cors({
  origin: [
    // 'http://localhost:3000',                // local dev frontend
    'https://one-geo-project-1.onrender.com'   // your deployed frontend URL
  ],
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// Use routes
app.use('/api/visualization', visualizationRoutes);
app.use('/api/interpret', aiRoutes);
app.use('/api/chatbot', chatRoutes);
app.use('/api', uploadRoutes);

module.exports = app;

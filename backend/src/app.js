const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// Health check endpoints
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'RESQGo Backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 404 and Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
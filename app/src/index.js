const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use(helmet());

// Logging
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Main application route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the DevOps CI/CD Demo App!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    host: require('os').hostname()
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app; // Export for testing

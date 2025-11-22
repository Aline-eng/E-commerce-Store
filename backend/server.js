const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error('❌ MONGODB_URI is not defined in environment variables');
    }

    console.log('🔄 Connecting to MongoDB...');
    
    // Connect to MongoDB first
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');

    // Then start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Start the server
startServer();

module.exports = app;
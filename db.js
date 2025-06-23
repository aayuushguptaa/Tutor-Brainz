/**
 * Database Configuration
 * ---------------------
 * Establishes and manages MongoDB connection using Mongoose
 * 
 * Features:
 * - Connection pooling
 * - Retry capability
 * - Error handling
 */

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority',
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose;

/**
 * Main Server Configuration
 * ------------------------
 * This file sets up the Express server, database connection, and API routes
 * for the Tutor Hub application.
 * 
 * Key Features:
 * - MongoDB integration with mongoose
 * - CORS configuration for cross-origin requests
 * - API endpoints for demo bookings and tutor registration
 * - Error handling middleware
 */

// Essential Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
require('./db');
const Tutor = require('./Student/Tutor_Schema_module/tutorModel');
const { updateExcel } = require('./excelIntegration');
const { createOrUpdateWorkbook } = require('./googleSheetsIntegration');

// Express Application Configuration
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (CSS, images, other HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Serve home.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});



// Request Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// JSON Header Middleware
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose Demo Schema
const demoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { 
    type: String, 
    required: true,
    enum: ['Math', 'Science', 'English', 'Coding', 'Python', 'Scratch', 'Java', 'C', 'Computers', 'Other']
  }
  
});

const Demo = mongoose.model('Demo', demoSchema);

// -------------------- Demo Booking Routes --------------------

// POST /api/demos - Create Demo Booking
app.post('/api/demos', async (req, res) => {
  try {
    const { name, email, phone, subject } = req.body;

    if (!name || !email || !phone || !subject) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newDemo = new Demo({ name, email, phone, subject });
    const savedDemo = await newDemo.save();

    res.status(201).json({
      message: 'Demo booking created successfully',
      data: savedDemo
    });
  } catch (error) {
    console.error('Error in POST /api/demos:', error);
    res.status(500).json({ error: 'Failed to create demo', details: error.message });
  }
});

// GET /api/demos - Get All Demos
app.get('/api/demos', async (req, res) => {
  try {
    const demos = await Demo.find();
    res.json(demos);
  } catch (error) {
    console.error('Error fetching demos:', error);
    res.status(500).json({ error: 'Failed to fetch demos' });
  }
});

// DELETE /api/demos/:id - Delete a Demo
app.delete('/api/demos/:id', async (req, res) => {
  try {
    await Demo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Demo deleted successfully' });
  } catch (error) {
    console.error('Error deleting demo:', error);
    res.status(500).json({ error: 'Failed to delete demo' });
  }
});

// -------------------- Tutor Registration Routes --------------------

// POST /api/tutors - Register a Tutor
app.post('/api/tutors', async (req, res) => {
  try {
    const { name, email, phone, qualification, college, preferredSubjects, board } = req.body;

    if (!name || !email || !phone || !qualification || !college || !preferredSubjects || !board) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newTutor = new Tutor({
      name,
      email,
      phone,
      qualification,
      college,
      preferredSubjects,
      board
    });

    const savedTutor = await newTutor.save();

    res.status(201).json({ message: 'Tutor registered successfully', data: savedTutor });
  } catch (error) {
    console.error('Error registering tutor:', error);
    res.status(500).json({ error: 'Failed to register tutor', details: error.message });
  }
});

// -------------------- Global Error Handlers --------------------

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// app.get('/', (req, res) => {
//   res.send('🎉 Tutor Brainz API is live!');
// });

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

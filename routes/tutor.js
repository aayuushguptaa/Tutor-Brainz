// // routes/tutor.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const Tutor = require('../models/Tutor');

// // Multer setup for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/resumes');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });

// // POST route to handle tutor registration
// router.post('/submit-tutor', upload.single('resume'), async (req, res) => {
//   try {
//     const { name, email, phone, experience, subjects } = req.body;
//     const resumePath = req.file ? req.file.path : null;

//     const newTutor = new Tutor({
//       name,
//       email,
//       phone,
//       experience,
//       subjects,
//       resumePath
//     });

//     await newTutor.save();
//     res.status(200).send('Tutor registration submitted successfully!');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

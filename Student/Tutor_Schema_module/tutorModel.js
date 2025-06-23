const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  qualification: { type: String, required: true },
  college: { type: String, required: true },
  preferredSubjects: [{ type: String, required: true }],
  board: {
    type: String,
    enum: ['CBSE', 'ICSE', 'State Board', 'IB', 'Other'],
    required: true
  }
});

const Tutor = mongoose.model('Tutor', tutorSchema);
module.exports = Tutor;

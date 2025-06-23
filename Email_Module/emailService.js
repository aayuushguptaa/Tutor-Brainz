const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
async function sendEmail(subject, message) {
  try {
    await transporter.sendMail({
      from: `"Tutor Brainz" <${process.env.EMAIL_USER}>`, // Sender address
      to: process.env.EMAIL_USER, // Your email address
      subject: subject, // Email subject
      text: message, // Plain text body
    });
    console.log('📧 Email sent successfully');
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

module.exports = { sendEmail };

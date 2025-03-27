const express = require('express');
const connectDB = require('../utils/db');
const OTP = require('../models/otp');
const { sendOTPEmail } = require('../utils/email');
require('dotenv').config();

const app = express();
app.use(express.json());

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

app.post('/api/generate-otp', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Connect to MongoDB
    await connectDB();

    // Generate OTP
    const otp = generateOTP();

    // Delete any existing OTP for this email
    await OTP.deleteMany({ email });

    // Save new OTP to database
    await OTP.create({
      email,
      otp
    });

    // Send OTP to user's email
    await sendOTPEmail(email, otp);

    // Send success response
    return res.status(200).json({
      success: true,
      message: `OTP sent to ${email}`
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = app;

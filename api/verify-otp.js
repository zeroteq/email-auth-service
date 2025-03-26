const express = require('express');
const connectDB = require('../utils/db');
const OTP = require('../models/otp');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate inputs
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Connect to MongoDB
    await connectDB();

    // Find OTP record
    const otpRecord = await OTP.findOne({ email });

    // Check if OTP exists
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found'
      });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // Delete the OTP record once verified
    await OTP.deleteOne({ _id: otpRecord._id });

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = app;

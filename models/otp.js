const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120 // TTL in seconds (2 minutes)
  }
});

// Check if model already exists to prevent overwrite error
module.exports = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

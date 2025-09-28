const connectDB = require('../utils/db');
const OTP = require('../models/otp');
const { sendOTPEmail } = require('../utils/email');

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    await connectDB();

    const otp = generateOTP();

    // Remove old OTPs for this email
    await OTP.deleteMany({ email });

    // Save new OTP
    await OTP.create({ email, otp });

    // Send OTP email
    await sendOTPEmail(email, otp);

    return res.status(200).json({ success: true, message: `OTP sent to ${email}` });
  } catch (error) {
    console.error('Error generating OTP:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate OTP' });
  }
};
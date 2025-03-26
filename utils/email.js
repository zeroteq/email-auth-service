const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send OTP to user's email
const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = createTransporter();
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #5D5CDE; text-align: center;">Email Verification</h2>
          <p>Hello,</p>
          <p>Your verification OTP is:</p>
          <div style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 15px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 2 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
          <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
            This is an automated message. Please do not reply.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = { sendOTPEmail };

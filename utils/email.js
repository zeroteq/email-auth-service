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

    // New Modern Email Template for Keid Marketplace
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Keid Marketplace - Your Verification Code',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Keid Marketplace - Verification</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
          <style>
            body, html {
              margin: 0;
              padding: 0;
              font-family: 'Inter', Arial, sans-serif;
              background-color: #f4f8fc;
              color: #1f2937;
            }
            .email-container {
              max-width: 500px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .email-header {
              background: #007bff;
              padding: 20px;
              text-align: center;
              color: #ffffff;
              font-size: 20px;
              font-weight: 600;
            }
            .email-body {
              padding: 30px;
              text-align: center;
            }
            .otp-box {
              background: #e6f0ff;
              padding: 20px;
              font-size: 28px;
              font-weight: bold;
              color: #007bff;
              border-radius: 8px;
              display: inline-block;
              letter-spacing: 5px;
              margin: 20px 0;
            }
            .message {
              font-size: 16px;
              color: #555;
              margin-bottom: 20px;
            }
            .verify-button {
              display: inline-block;
              background: #007bff;
              color: #ffffff;
              padding: 12px 20px;
              font-size: 16px;
              font-weight: 600;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 10px;
            }
            .verify-button:hover {
              background: #0056b3;
            }
            .email-footer {
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
              background: #f4f8fc;
            }
            .support-link {
              color: #007bff;
              text-decoration: none;
              font-weight: 600;
            }
            @media screen and (max-width: 500px) {
              .email-container {
                width: 90%;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              Keid Marketplace
            </div>
            
            <div class="email-body">
              <h2>Verify Your Account</h2>
              <p class="message">Use the verification code below to confirm your email.</p>
              
              <div class="otp-box">${otp}</div>
              
              <p class="message">This code expires in 5 minutes. If you didn’t request this, you can ignore this email.</p>

              <a href="#" class="verify-button">Verify Now</a>
            </div>
            
            <div class="email-footer">
              <p>© ${new Date().getFullYear()} Keid Marketplace. All rights reserved.</p>
              <p>Need help? <a href="mailto:support@keidmarketplace.com" class="support-link">Contact Support</a></p>
            </div>
          </div>
        </body>
        </html>
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

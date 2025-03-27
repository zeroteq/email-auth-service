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
    // Elegant Email content for Keid Marketplace
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code for Keid Marketplace',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Keid Marketplace - Verification</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
          <style>
            body, html {
              margin: 0;
              padding: 0;
              font-family: 'Inter', Arial, sans-serif;
              line-height: 1.6;
              background-color: #f4f6f9;
            }
            .email-wrapper {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              border-radius: 16px;
              overflow: hidden;
            }
            .email-header {
              background: linear-gradient(to right, #5D5CDE, #4A47B8);
              color: white;
              padding: 30px 20px;
              text-align: center;
            }
            .email-header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
              letter-spacing: -0.5px;
            }
            .email-body {
              padding: 40px 30px;
              text-align: center;
            }
            .otp-container {
              background: linear-gradient(145deg, #f0f4f8 0%, #e6eaf0 100%);
              border: 2px solid rgba(93, 92, 222, 0.2);
              border-radius: 12px;
              padding: 25px;
              margin: 30px 0;
              display: inline-block;
              box-shadow: 
                inset 0 2px 4px rgba(0,0,0,0.05),
                0 4px 6px rgba(0,0,0,0.05);
            }
            .otp-code {
              font-size: 32px;
              font-weight: 700;
              color: #5D5CDE;
              letter-spacing: 10px;
              background: linear-gradient(45deg, #5D5CDE, #4A47B8);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .email-footer {
              background-color: #f4f6f9;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
            }
            .subtle-text {
              color: #6b7280;
              font-size: 14px;
              margin-top: 20px;
            }
            @media screen and (max-width: 600px) {
              .email-wrapper {
                width: 100%;
                border-radius: 0;
              }
              .otp-code {
                font-size: 26px;
                letter-spacing: 6px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="email-header">
              <h1>Keid Marketplace</h1>
            </div>
            
            <div class="email-body">
              <h2 style="color: #1F2937; margin-bottom: 20px;">Verify Your Account</h2>
              
              <p style="color: #4B5563; margin-bottom: 30px;">
                To secure your Keid Marketplace account, please enter the verification code below.
              </p>
              
              <div class="otp-container">
                <div class="otp-code">${otp}</div>
              </div>
              
              <p class="subtle-text">
                This code will expire in 2 minutes. If you didn't request this verification, 
                you can safely ignore this email.
              </p>
            </div>
            
            <div class="email-footer">
              <p>© ${new Date().getFullYear()} Keid Marketplace. All rights reserved.</p>
              <p>Need help? <a href="mailto:support@keidmarketplace.com" style="color: #5D5CDE; text-decoration: none;">Contact Support</a></p>
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

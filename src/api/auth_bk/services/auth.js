'use strict';

/**
 * auth service
 */

'use strict';
const axios = require("axios");
 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

module.exports = {
  sendOtpMobile: async (mobile, otp) => {
    try {
      console.log("mobile", mobile);
      const apiKey = process.env.TEXT_LOCAL_API_KEY;
      const sender = process.env.TEXT_LOCAL_SENDER_ID;
      const numbers = "91"+mobile; // Using the mobile parameter
      const message = encodeURIComponent(
        `Your OTP verification code is ${otp}. Thanks for registering at Skullcandy.in`
      );

      const params = {
        apiKey: apiKey,
        sender: sender,
        numbers: numbers,
        message: message,
      };

      const response = await axios.get("https://api.textlocal.in/send/",{params});

      console.log("response", response.data);
      console.log("OTP Mobile sent successfully");
    } catch (error) {
      console.error(
        "Error sending OTP Mobile:",
        error.response ? error.response.data : error.message
      );
    }
  },
  sendOtpEmail: async (email, otp) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
      };

      await transporter.sendMail(mailOptions);
      console.log('OTP email sent successfully');
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  },
  forgetpasswordEmail: async (email, password) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Your new password',
        text: `Your new password is: ${password}`,
        html: `<p>Your new password is: <strong>${password}</strong></p>`,

      };

      await transporter.sendMail(mailOptions);
      console.log('OTP email sent successfully');
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  },
  generateJwtToken: (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '3d' });
  }
};
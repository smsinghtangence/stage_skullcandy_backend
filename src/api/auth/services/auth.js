'use strict';

/**
 * auth service
 */

'use strict';

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

module.exports = {
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

  generateJwtToken: (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '3d' });
  }
};
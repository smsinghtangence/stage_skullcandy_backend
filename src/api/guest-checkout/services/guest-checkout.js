"use strict";

/**
 * guest-checkout service
 */

const jwt = require("jsonwebtoken");
const axios = require("axios");
const { networkInterfaces } = require("os");

module.exports = () => ({
  generateJwtToken(user) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id, email: user.email },
        strapi.config.get("plugin.users-permissions.jwtSecret"),
        {
          expiresIn: "7d", // Token expiration time
        },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  },

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

      const response = await axios.get("https://api.textlocal.in/send/", {
        params,
      });

      console.log("response", response.data);
      console.log("OTP Mobile sent successfully");
    } catch (error) {
      console.error(
        "Error sending OTP Mobile:",
        error.response ? error.response.data : error.message
      );
    }
  },

  findIpAddress: () => {
    const results = Object.values(networkInterfaces())
      .flat()
      .filter((net) => (net.family === "IPv4") && !net.internal)
      .map((net) => net.address);

      console.log("results",results);

    return results;
  },
});

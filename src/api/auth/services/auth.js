"use strict";

/**
 * auth service
 */

"use strict";

const axios = require("axios");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

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

  generateJwtToken: (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "3d",
    });
  },
};

// const jwt = require("jsonwebtoken");
// const axios = require("axios");
// const SECRET_KEY = process.env.JWT_SECRET;

// module.exports = {
//   sendOtpEmail: async (mobile, otp) => {
//     try {
//       const apiKey = process.env.TEXT_LOCAL_API_KEY;
//       const sender = process.env.TEXT_LOCAL_SENDER_ID;
//       const numbers = "91" + "6355731229";
//       const message = encodeURIComponent(`Your OTP verification code is ${otp}. Thanks for registering at Skullcandy.in`);

//       const response = await axios.post(
//         "https://api.textlocal.in/send/",
//         {
//           apiKey: apiKey,
//           sender: sender,
//           numbers: numbers,
//           message: message,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("OTP Mobile sent successfully");
//     } catch (error) {
//       console.error("Error sending OTP Mobile:", error);
//     }
//   },

//   generateJwtToken: (user) => {
//     return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
//       expiresIn: "3d",
//     });
//   },
// };

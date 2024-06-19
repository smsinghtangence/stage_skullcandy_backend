"use strict";
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = {
  async login(ctx) {
    try {
        const mobile = ctx.request.body.mobile;
        const entry = await strapi.db.query("api::mobileotp.mobileotp").findOne({
            where: { mobile },
        });

        if (!entry) {
            ctx.send({ message: "Mobile Number Not Found" }, 404);
            return;
        }

        const otp = generateOtp();
        const updatedEntry = await strapi.db.query("api::mobileotp.mobileotp").update({
            where: { id: entry.id },
            data: { otp: otp },
        });

        strapi.service("api::mobileotp.mobileotp").sendSms(mobile, otp);
        ctx.send({ message: "OTP sent successfully", data: updatedEntry }, 200);
    } catch (error) {
        ctx.throw(400, error.message);
    }
},

  async verify(ctx) {
    try {
      const { mobile } = ctx.params;
      const { otp } = ctx.request.body;
      const verificationResult = await strapi
        .service("api::mobileotp.mobileotp")
        .verifyOtp(mobile, otp);
      if (verificationResult.valid) {
        ctx.send(
          {
            message: "OTP verified successfully",
            token: verificationResult.token,
          },
          200
        );
      } else {
        ctx.send({ message: "Invalid OTP" }, 400);
      }
    } catch (error) {
      ctx.throw(400, error.message);
    }
  },

  async create(ctx) {
    try {
      const data = ctx.request.body;
      const result = await strapi
        .service("api::mobileotp.mobileotp")
        .create(data);
      strapi
        .service("api::mobileotp.mobileotp")
        .sendSms(data.mobile, result.otp);
      ctx.send(
        { message: "OTP created and sent successfully", data: result },
        201
      );
    } catch (error) {
      ctx.throw(400, error.message);
    }
  },

  async get(ctx) {
    try {
      const otps = await strapi.service("api::mobileotp.mobileotp").get();
      ctx.send({ data: otps }, 200);
    } catch (error) {
      ctx.throw(400, error.message);
    }
  },

  
};

// module.exports = {
//   async create(ctx) {
//       try {
//           const data = ctx.request.body;
//           const result = await strapi.service("api::mobileotp.mobileotp").create(data);
//           strapi.service("api::mobileotp.mobileotp").sendSms(data.mobile, result.otp);
//           delete result.otp;
//           ctx.send({ message: 'OTP created and sent successfully', data: result }, 201);
//       } catch (error) {
//           ctx.throw(400, error.message);
//       }
//   },

//   async get(ctx) {
//       try {
//           const otps = await strapi.service("api::mobileotp.mobileotp").get();
//           ctx.send({ data: otps }, 200);
//       } catch (error) {
//           ctx.throw(400, error.message);
//       }
//   },

//   async verify(ctx) {
//     try {
//         const { mobile } = ctx.params;
//         const { otp } = ctx.request.body;
//         const isValid = await strapi.service("api::mobileotp.mobileotp").verifyOtp(mobile, otp);
//         if (isValid) {
//             ctx.send({ message: 'OTP verified successfully' }, 200);
//         } else {
//             ctx.send({ message: 'Invalid OTP' }, 400);
//         }
//     } catch (error) {
//         ctx.throw(400, error.message);
//     }
// },
// };

/**
 * A set of functions called "actions" for `mobileotp`
 */

// module.exports = {
//   async create(ctx) {
//   strapi.service("api::mobileotp.mobileotp").sendSms();
//   return await strapi.service("api::mobileotp.mobileotp")
//   },

//   async get(ctx) {
//   return await strapi.service("api::mobileotp.mobileotp")
// },
// }

// function generateOtp() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// const otps = generateOtp();

// module.exports = {
//   async create(ctx) {
//       try {
//           const data = ctx.request.body;
//           const newOtp = await strapi.service("api::mobileotp.mobileotp").create(data);
//           strapi.service("api::mobileotp.mobileotp").sendSms(data.mobile, otps);
//           ctx.send({ message: 'OTP created and sent successfully', data: newOtp }, 201);
//       } catch (error) {
//           ctx.throw(400, error.message);
//       }
//   },

//   async get(ctx) {
//       try {
//           const otps = await strapi.service("api::mobileotp.mobileotp").get();
//           ctx.send({ data: otps }, 200);
//       } catch (error) {
//           ctx.throw(400, error.message);
//       }
//   },
// };

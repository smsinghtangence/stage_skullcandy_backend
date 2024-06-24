"use strict";

/**
 * A set of functions called "actions" for `auth`
 */

module.exports = {
  async sendOtp(ctx) {
    const { mobile } = ctx.request.body;

    if (!mobile) {
      return ctx.badRequest('Mobile is required');
    }

    try {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otpExpiresAt = new Date(Date.now() + 30 * 1000); // OTP expires in 30 seconds

      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { mobile } });

      if (!user) {
        return ctx.notFound('User not found');
      }

      await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: { otp, otpExpiresAt },
      });

      await strapi.service('api::auth.auth').sendOtpMobile(mobile, otp);

      ctx.send({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      ctx.badRequest('Unable to send OTP');
    }
  },

  async verifyOtp(ctx) {
    const { mobile, otp } = ctx.request.body;

    if (!mobile || !otp) {
      return ctx.badRequest('Mobile and OTP are required');
    }

    try {
      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { mobile } });

      if (!user) {
        return ctx.notFound('User not found');
      }

      if (user.otp !== otp) {
        return ctx.badRequest('Invalid OTP');
      }

      if (new Date() > new Date(user.otpExpiresAt)) {
        await strapi.query('plugin::users-permissions.user').update({
          where: { id: user.id },
          data: { otp: null, otpExpiresAt: null },
        });
        return ctx.badRequest('OTP expired');
      }

      const token = strapi.service('api::auth.auth').generateJwtToken(user);

      const data = await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: { otp: null, otpExpiresAt: null, token },
      });

      ctx.send({ message: 'OTP verified successfully', jwt:token, user:data });
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      ctx.badRequest('Unable to verify OTP');
    }
  },

  async resendOtp(ctx) {
    const { mobile } = ctx.request.body;

    if (!mobile) {
      return ctx.badRequest('Mobile is required');
    }

    try {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otpExpiresAt = new Date(Date.now() + 30 * 1000); // OTP expires in 30 seconds

      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { mobile } });

      if (!user) { 
        return ctx.notFound('User not found');
      }

      await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: { otp, otpExpiresAt },
      });

      await strapi.service('api::auth.auth').sendOtpMobile(mobile, otp);

      ctx.send({ message: 'OTP resent successfully' });
    } catch (error) {
      console.error("Error resending OTP:", error.message);
      ctx.badRequest('Unable to resend OTP');
    }
  },
};


// module.exports = {
//   async sendOtp(ctx) {
//     const { mobile } = ctx.request.body;

//     if (!mobile) {
//       return ctx.badRequest('Mobile is required');
//     }

//     try {
//       const otp = Math.floor(1000 + Math.random() * 9000).toString();

//       const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { mobile } });

//       if (!user) {
//         return ctx.notFound('User not found');
//       }

//       await strapi.query('plugin::users-permissions.user').update({
//         where: { id: user.id },
//         data: { otp },
//       });

//       await strapi.service('api::auth.auth').sendOtpMobile(mobile, otp);

//       ctx.send({ message: 'OTP sent successfully' });
//     } catch (error) {
//       console.error("Error sending OTP:", error.message);
//       ctx.badRequest('Unable to send OTP');
//     }
//   },

//   async verifyOtp(ctx) {
//     const { mobile, otp } = ctx.request.body;

//     if (!mobile || !otp) {
//       return ctx.badRequest('Mobile and OTP are required');
//     }

//     try {
//       const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { mobile } });

//       if (!user) {
//         return ctx.notFound('User not found');
//       }

//       if (user.otp !== otp) {
//         return ctx.badRequest('Invalid OTP');
//       }

//       const token = strapi.service('api::auth.auth').generateJwtToken(user);

//       const data = await strapi.query('plugin::users-permissions.user').update({
//         where: { id: user.id },
//         data: { otp: null, token: token },
//       });

//       ctx.send({ message: 'OTP verified successfully', jwt:token, user:data });
//     } catch (error) {
//       console.error("Error verifying OTP:", error.message);
//       ctx.badRequest('Unable to verify OTP');
//     }
//   },

//   async resendOtp(ctx) {
//     const { mobile } = ctx.request.body;

//     if (!mobile) {
//       return ctx.badRequest('Mobile is required');
//     }

//     try {
//       const otp =  Math.floor(1000 + Math.random() * 9000).toString();

//       const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { mobile } });

//       if (!user) {
//         return ctx.notFound('User not found');
//       }

//       await strapi.query('plugin::users-permissions.user').update({
//         where: { id: user.id },
//         data: { otp },
//       });

//       await strapi.service('api::auth.auth').sendOtpMobile(mobile, otp);

//       ctx.send({ message: 'OTP resent successfully' });
//     } catch (error) {
//       console.error("Error resending OTP:", error.message);
//       ctx.badRequest('Unable to resend OTP');
//     }
//   },
// };

// module.exports = {
//   // exampleAction: async (ctx, next) => {
//   //   try {
//   //     ctx.body = 'ok';
//   //   } catch (err) {
//   //     ctx.body = err;
//   //   }
//   // }
// };

// const { v4: uuidv4 } = require('uuid');

// module.exports = {
//   async sendOtp(ctx) {
//     const { mobile } = ctx.request.body;

//     if (!mobile) {
//       return ctx.badRequest('Mobile is required');
//     }

//     try {

//       const otp = Math.floor(100000 + Math.random() * 900000).toString();

//       const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { mobile } });

//       if (!user) {
//         return ctx.notFound('User not found');
//       }

//       await strapi.query('plugin::users-permissions.user').update({
//         where: { id: user.id },
//         data: { otp },
//       });

//       await strapi.service('api::auth.auth').sendOtpMobile(mobile, otp);

//       ctx.send({ message: 'OTP sent successfully' });
//     } catch (error) {
//       ctx.badRequest('Unable to send OTP');
//     }
//   },

//   async verifyOtp(ctx) {
//     const { email, otp } = ctx.request.body;

//     if (!email || !otp) {
//       return ctx.badRequest('Email and OTP are required');
//     }

//     try {
//       const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

//       if (!user) {
//         return ctx.notFound('User not found');
//       }

//       if (user.otp !== otp) {
//         return ctx.badRequest('Invalid OTP');
//       }
//       const token = strapi.service('api::auth.auth').generateJwtToken(user);

//       const data = await strapi.query('plugin::users-permissions.user').update({
//         where: { id: user.id },
//         data: { otp: null, token: token },
//       });

//       ctx.send({ message: 'OTP verified successfully', data });
//     } catch (error) {
//       ctx.badRequest('Unable to verify OTP');
//     }
//   },
// };

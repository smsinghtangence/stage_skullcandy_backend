'use strict';

/**
 * A set of functions called "actions" for `auth`
 */

// module.exports = {
//   // exampleAction: async (ctx, next) => {
//   //   try {
//   //     ctx.body = 'ok';
//   //   } catch (err) {
//   //     ctx.body = err;
//   //   }
//   // }
// };

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
module.exports = {
  async sendOtp(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('Email is required');
    }

    try {
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

      if (!user) {
        return ctx.notFound('User not found');
      }

      await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: { otp },
      });

  
      await strapi.service('api::auth.auth').sendOtpEmail(email, otp);

      ctx.send({ message: 'OTP sent successfully' });
    } catch (error) {
      ctx.badRequest('Unable to send OTP');
    }
  },

  async verifyOtp(ctx) {
    const { email, otp } = ctx.request.body;

    if (!email || !otp) {
      return ctx.badRequest('Email and OTP are required');
    }

    try {
      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

      if (!user) {
        return ctx.notFound('User not found');
      }

      if (user.otp !== otp) {
        return ctx.badRequest('Invalid OTP');
      }

      await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: { otp: null },
      });

      const token = strapi.service('api::auth.auth').generateJwtToken(user);

      ctx.send({ message: 'OTP verified successfully', token });
    } catch (error) {
      ctx.badRequest('Unable to verify OTP');
    }
  },
 


 

// // const resetPassword = generatePassword();
// const resetPassword = "text";

// const hashedPassword = await strapi.plugins['users-permissions'].services.user.hashPassword({ password: resetPassword });

// await strapi.query('plugin::users-permissions.user').update({ where: { email }, data: { resetPasswordToken: null, password: hashedPassword } });

//       ////////////
  
//       await strapi.service('api::auth.auth').sendOtpEmail(email, resetPassword);

//       ctx.send({ message: 'OTP sent successfully' });
//     } catch (error) {
//       ctx.badRequest('Unable to send OTP');
//     }
//   },
async forgetPassword(ctx) {
  const { email } = ctx.request.body;

  if (!email) {
    return ctx.badRequest('Email is required');
  }

  try {

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

    if (!user) {
      return ctx.notFound('User not found');
    }

  //   await strapi.query('plugin::users-permissions.user').update({
  //     where: { id: user.id },
  //     data: { otp },
  //   });


  //   await strapi.service('api::auth.auth').sendOtpEmail(email, otp);

  //   ctx.send({ message: 'OTP sent successfully' });
  // } catch (error) {
  //   ctx.badRequest('Unable to send OTP');
  // }

  const newPassword ="Pass@"+otp
  // const hashedPassword = await strapi.plugins['users-permissions'].services.user.hashPassword({ password: newPassword });

   

  // // Send the email with the new password
  const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await strapi.query('plugin::users-permissions.user').update({
      where: { email },
      data: { resetPasswordToken: null, password: hashedPassword },
    });



  await strapi.service('api::auth.auth').forgetpasswordEmail(email, newPassword);

  ctx.send({ message: "Mail send" });
 } catch (error) {
    ctx.badRequest('Unable to send OTP');
  }
},

async changePassword(ctx) {
  const { currentPassword, newPassword } = ctx.request.body;

  const user = ctx.state.user; // assuming the user is authenticated
 
  if (!user) {
    return ctx.badRequest('User not found');
  }

  const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(
    currentPassword,
    user.password
  );
 
  if (!validPassword) {
    return ctx.badRequest('Invalid current password');
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  // const hashedPassword = await strapi.plugins['users-permissions'].services.user.hashPassword({
  //   password: newPassword,
  // });
 
  // await strapi.query('user', 'users-permissions').update(
  //   { id: user.id },
  //   { password: hashedPassword }
  // );

  await strapi.query('plugin::users-permissions.user').update({
    where: {id: user.id },
    data: { resetPasswordToken: null, password: hashedPassword },
  });

  ctx.send({ success: true });
},
};
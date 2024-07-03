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
const jwt = require("jsonwebtoken");
module.exports = {
  async sendEmailOtp(ctx) {
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

  async verifyEmailOtp(ctx) {
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
 
  // 
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

  const newPassword ="Skull@"+otp
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


async register(ctx) {
  const {
     
    email,
    
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    state,
    zipcode,
    country,
    mobile,
    Company_Name,
    GSTIN,
    Cart,
  } = ctx.request.body;

 const username = mobile

  if (!mobile || !email) {
    return ctx.badRequest("Mobile and email are required");
  }

//////////////////////
const otp = Math.floor(100000 + Math.random() * 900000).toString();

const newPassword ="Skull@"+otp
 
 
  // // Send the email with the new password
  const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    // await strapi.query('plugin::users-permissions.user').update({
    //   where: { email },
    //   data: { resetPasswordToken: null, password: hashedPassword },
    // });

    const full_name = first_name + " " + last_name

  await strapi.service('api::auth.auth').guestNewRegistrationEmail(email,full_name, newPassword);
const password = hashedPassword
///////////////




  try {
    const existingUser = await strapi
      .query("plugin::users-permissions.user")
      .findOne({ where: { email } });
    if (existingUser) {
      return ctx.badRequest("User with this email already exists");
    }

    const newUser = await strapi
      .query("plugin::users-permissions.user")
      .create({
        data: {
          username,
          email,
          password,
          first_name,
          last_name,
          address_1,
          address_2,
          city,
          state,
          zipcode,
          country,
          mobile,
          Company_Name,
          GSTIN,
          Cart,
          confirmed: true,
          blocked: false,
        },
      });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const authenticatedRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "authenticated" } });

    const data = await strapi.query("plugin::users-permissions.user").update({
      where: { id: newUser.id },
      data: {
        token,
        role: authenticatedRole,
      },
    });

    return ctx.send({
      jwt: token,
      user: {
        ...data,
        role:authenticatedRole ,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return ctx.badRequest("Unable to register user");
  }
},
async alreadyUserMobileExist(ctx) {
  const { mobile } = ctx.query;

  try {
    const user = await strapi
      .query("plugin::users-permissions.user")
      .findOne({ where: { mobile } });

    if (user) {
      return ctx.send({ status: 401, message: "User Already Exist" });
    }

    ctx.send({
      status: 200,
      message: "User does not exist",
    });
  } catch (error) {
    console.error("Error checking user existence:", error.message);
    ctx.badRequest("Unable to check user existence");
  }
},

async alreadyUserEmailExist(ctx) {
  const { email } = ctx.query;

  try {
    const user = await strapi
      .query("plugin::users-permissions.user")
      .findOne({ where: { email } });

    if (user) {
      return ctx.send({ status: 401, message: "User Already Exist" });
    }

    ctx.send({
      status: 200,
      message: "User does not exist",
    });
  } catch (error) {
    console.error("Error checking user existence:", error.message);
    ctx.badRequest("Unable to check user existence");
  }
},
};
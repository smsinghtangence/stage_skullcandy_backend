// @ts-nocheck
"use strict";

/**
 * A set of functions called "actions" for `up_users`
 */

module.exports = {
  async create(ctx) {
    try {
      const {
        email,
        mobile,
        country,
        firstname,
        lastname,
        address1,
        address2,
        city,
        state,
        zipcode,
        userStatus,
        username
      } = ctx.request.body;

      const existingUser = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: {
            $or: [{ mobile }, { email }],
          },
        });

      if (existingUser) {
        return ctx.notFound("User already exists");
      }

      const data = await strapi
        .query("plugin::users-permissions.user")
        .create({
          data: {
            username,
            email,
            mobile,
            country,
            firstname,
            lastname,
            address1,
            address2,
            city,
            state,
            zipcode,
            userStatus: "1",
          },
        });

      ctx.send({
        status: 200,
        message: "Guest Checkout Successfully",
        data
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async verifyOtp(ctx) {
    const { mobile, otp } = ctx.request.body;

    if (!mobile || !otp) {
      return ctx.badRequest("Mobile and OTP are required");
    }

    try {
      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { mobile } });

      if (!user) {
        return ctx.notFound("User not found");
      }

      if (user.otp !== otp) {
        return ctx.badRequest("Invalid OTP");
      }

      if (new Date() > new Date(user.otpExpiresAt)) {
        await strapi.query("plugin::users-permissions.user").update({
          where: { id: user.id },
          data: { otp: null, otpExpiresAt: null },
        });
        return ctx.badRequest("OTP expired");
      }

      const token = await strapi
        .service("api::checkout.checkout")
        .generateJwtToken(user);

      const data = await strapi.query("plugin::users-permissions.user").update({
        where: { id: user.id },
        data: { otp: null, otpExpiresAt: null, token, confirmed: true },
      });

      ctx.send({
        message: "OTP verified successfully",
        jwt: token,
        user: data,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      ctx.badRequest("Unable to verify OTP");
    }
  },

  async resendOtp(ctx) {
    const { mobile } = ctx.request.body;

    if (!mobile) {
      return ctx.badRequest("Mobile is required");
    }

    try {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otpExpiresAt = new Date(Date.now() + 30 * 1000); // OTP expires in 30 seconds

      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { mobile } });

      if (!user) {
        return ctx.notFound("User not found");
      }

      await strapi.query("plugin::users-permissions.user").update({
        where: { id: user.id },
        data: { otp, otpExpiresAt },
      });

      await strapi.service("api::checkout.checkout").sendOtpMobile(mobile, otp);

      ctx.send({ message: "OTP resent successfully" });
    } catch (error) {
      console.error("Error resending OTP:", error.message);
      ctx.badRequest("Unable to resend OTP");
    }
  },
};

// async find(ctx) {
//   try {
//     const users = await strapi.query('plugin::users-permissions.user').find(ctx.query);
//     ctx.send(users);
//   } catch (err) {
//     ctx.throw(500, err);
//   }
// },

// async findOne(ctx) {
//   try {
//     const { id } = ctx.params;
//     const user = await strapi.query('plugin::users-permissions.user').findOne({ id });

//     if (!user) {
//       return ctx.throw(404, 'User not found');
//     }

//     ctx.send(user);
//   } catch (err) {
//     ctx.throw(500, err);
//   }
// },

// async update(ctx) {
//   try {
//     const { id } = ctx.params;
//     const updates = ctx.request.body;

//     const updatedUser = await strapi.query('up_users').update({ id }, updates);
//     ctx.send(updatedUser);
//   } catch (err) {
//     ctx.throw(500, err);
//   }
// },

// async delete(ctx) {
//   try {
//     const { id } = ctx.params;
//     const deletedUser = await strapi.query('up_users').delete({ id });

//     ctx.send(deletedUser);
//   } catch (err) {
//     ctx.throw(500, err);
//   }
// },

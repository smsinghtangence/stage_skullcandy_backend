"use strict";

/**
 * A set of functions called "actions" for `guest-checkout`
 */

module.exports = {
  async mobileOtp(ctx) {
    try {
      const { mobile } = ctx.request.body;

      const existingUser = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { mobile } });

      if (existingUser) {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpiresAt = new Date(Date.now() + 30 * 1000);

        await strapi.query("plugin::users-permissions.user").update({
          where: { id: existingUser.id },
          data: { user_status: "registered", otp, otpExpiresAt },
        });

        const ip = await strapi
          .service("api::guest-checkout.guest-checkout")
          .findIpAddress();
        await strapi.query("api::customer-log.customer-log").create({
          data: {
            ip: ip[0],
            mobile,
            user_status: "registered",
            username: existingUser.username
          },
        });

        await strapi
          .service("api::guest-checkout.guest-checkout")
          .sendOtpMobile(mobile, otp);

        ctx.send({
          message: "OTP Send successfully",
          user_status: "registered",
        });
      } else {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpiresAt = new Date(Date.now() + 30 * 1000);

        const data = await strapi
          .query("plugin::users-permissions.user")
          .create({
            data: { mobile, user_status: "guest", otp, otpExpiresAt },
          });

        const ip = await strapi
          .service("api::guest-checkout.guest-checkout")
          .findIpAddress();
        await strapi.query("api::customer-log.customer-log").create({
          data: {
            ip: ip[0],
            mobile,
            user_status: "guest",
          },
        });

        await strapi
          .service("api::guest-checkout.guest-checkout")
          .sendOtpMobile(mobile, otp);

        ctx.send({ message: "OTP Send successfully", user_status: "guest" });
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  // async verifyOtp(ctx) {
  //   const { mobile, otp } = ctx.request.body;

  //   if (!mobile || !otp) {
  //     return ctx.badRequest("Mobile and OTP are required");
  //   }

  //   try {
  //     const user = await strapi
  //       .query("plugin::users-permissions.user")
  //       .findOne({ where: { mobile } });

  //     if (!user) {
  //       return ctx.notFound("User not found");
  //     }

  //     if (user.user_status === "registered" || user.user_status === "guest") {
  //       if (user.otp !== otp) {
  //         return ctx.badRequest("Invalid OTP");
  //       }

  //       if (new Date() > new Date(user.otpExpiresAt)) {
  //         await strapi.query("plugin::users-permissions.user").update({
  //           where: { id: user.id },
  //           data: { otp: null, otpExpiresAt: null },
  //         });
  //         return ctx.badRequest("OTP expired");
  //       }

  //       const token = await strapi
  //         .service("api::guest-checkout.guest-checkout")
  //         .generateJwtToken(user);

  //       const data = await strapi
  //         .query("plugin::users-permissions.user")
  //         .update({
  //           where: { id: user.id },
  //           data: { otp: null, otpExpiresAt: null, token, confirmed: true },
  //         });

  //       ctx.send({
  //         message: "OTP verified successfully",
  //         jwt: token,
  //         user: data,
  //       });
  //     } else {
  //       ctx.send({
  //         status: 404,
  //         message: "User status not recognized",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error.message);
  //     ctx.badRequest("Unable to verify OTP");
  //   }
  // },


  async verifyOtp(ctx) {
    const { mobile, otp } = ctx.request.body;
  
    if (!mobile || !otp) {
      return ctx.badRequest("Mobile and OTP are required");
    }
  
    try {
      // Find user by mobile and populate the role relation
      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { mobile }, populate: ['role'] });
  
      if (!user) {
        return ctx.notFound("User not found");
      }
  
      // Check user status and verify OTP
      if (user.user_status === "registered" || user.user_status === "guest") {
        if (user.otp !== otp) {
          return ctx.badRequest("Invalid OTP");
        }
  
        // Check OTP expiration
        if (new Date() > new Date(user.otpExpiresAt)) {
          await strapi.query("plugin::users-permissions.user").update({
            where: { id: user.id },
            data: { otp: null, otpExpiresAt: null },
          });
          return ctx.badRequest("OTP expired");
        }
  
        // Find the "authenticated" role
        const authenticatedRole = await strapi
          .query("plugin::users-permissions.role")
          .findOne({ where: { type: 'authenticated' } });
  
        if (!authenticatedRole) {
          return ctx.badRequest("Authenticated role not found");
        }
  
        // Generate JWT token
        const token = await strapi
          .service("api::guest-checkout.guest-checkout")
          .generateJwtToken(user);
  
        // Update user with OTP cleared, token, confirmed status, and role
        const updatedUser = await strapi
          .query("plugin::users-permissions.user")
          .update({
            where: { id: user.id },
            data: {
              otp: null,
              otpExpiresAt: null,
              token,
              confirmed: true,
              role: authenticatedRole.id, // Assign authenticated role
            },
          });
  
        // Send response with role included
        ctx.send({
          message: "OTP verified successfully",
          jwt: token,
          user: {
            ...updatedUser,
            role: authenticatedRole, // Include role in response
          },
        });
      } else {
        ctx.send({
          status: 404,
          message: "User status not recognized",
        });
      }
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

      await strapi
        .service("api::guest-checkout.guest-checkout")
        .sendOtpMobile(mobile, otp);

      ctx.send({ message: "OTP resent successfully" });
    } catch (error) {
      console.error("Error resending OTP:", error.message);
      ctx.badRequest("Unable to resend OTP");
    }
  },
};

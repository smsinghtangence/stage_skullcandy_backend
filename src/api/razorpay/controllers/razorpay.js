"use strict";
const Razorpay = require("razorpay");
const shortid = require("shortid");
/**
 * A set of functions called "actions" for `razorpay`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },

  generateorder: async (ctx, next) => {
    const {
      amount,
      mobile,
      email,
      country,
      firstname,
      lastname,
      address1,
      address2,
      city,
      state,
      zipcode,
      username,
      Company_Name,
      GSTIN,
    } = ctx.request.body;

    // Initialize Razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amountInPaise = amount * 100; // Converting amount to paise
    const currency = "INR";
    const options = {
      amount: amountInPaise,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);

      // Check if user exists
      const existingUser = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { mobile } });

      let userData;
      if (existingUser) {
        // Update existing user data
        userData = await strapi.query("plugin::users-permissions.user").update({
          where: { mobile },
          data: {
            username,
            email,
            country,
            firstname,
            lastname,
            address1,
            address2,
            city,
            state,
            mobile,
            zipcode,
            Company_Name,
            GSTIN,
          },
        });
      } else {
        // Create new user data
        userData = await strapi.query("plugin::users-permissions.user").create({
          data: {
            username,
            email,
            country,
            firstname,
            lastname,
            address1,
            address2,
            city,
            state,
            mobile,
            zipcode,
            Company_Name,
            GSTIN,
          },
        });
      }

      ctx.send({
        status: 200,
        message: "Order created and user data updated successfully",
        order: {
          id: response.id,
          currency: response.currency,
          amount: response.amount,
        },
        user: userData,
      });
    } catch (err) {
      console.log(err);
      ctx.throw(500, err);
    }
  },

  // generateorder: async (ctx, next) => {
  //   const {
  //     amount,
  //     mobile,
  //     email,
  //     country,
  //     firstname,
  //     lastname,
  //     address1,
  //     address2,
  //     city,
  //     state,
  //     zipcode,
  //     username,
  //     Company_Name,
  //     GSTIN,
  //   } = ctx.request.body;

  //   // Initialize Razorpay object
  //   const razorpay = new Razorpay({
  //     key_id: process.env.KEY_ID,
  //     key_secret: process.env.KEY_SECRET,
  //   });

  //   // Create an order -> generate the OrderID -> Send it to the Front-end
  //   // Also, check the amount and currency on the backend (Security measure)
  //   const payment_capture = 1;
  //   const amountInPaise = amount * 100; // Converting amount to paise
  //   const currency = "INR";
  //   const options = {
  //     amount: amountInPaise,
  //     currency,
  //     receipt: shortid.generate(),
  //     payment_capture,
  //   };

  //   try {
  //     const response = await razorpay.orders.create(options);

  //     const existingUser = await strapi
  //       .query("plugin::users-permissions.user")
  //       .findOne({ where: { mobile } });

  //     const data = await strapi.query("plugin::users-permissions.user").update({
  //       where: { mobile },
  //       data: {
  //         username,
  //         email,
  //         country,
  //         firstname,
  //         lastname,
  //         address1,
  //         address2,
  //         city,
  //         state,
  //         mobile,
  //         zipcode,
  //         Company_Name,
  //         GSTIN,
  //       },
  //     });

  //     ctx.send({
  //       status: 200,
  //       message: "Order created and user data updated successfully",
  //       order: {
  //         id: response.id,
  //         currency: response.currency,
  //         amount: response.amount,
  //       },
  //       user: data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     ctx.throw(500, err);
  //   }
  // },

  // generateorder: async (ctx, next) => {
  //   // Initialize razorpay object
  //   // const razorpay = new Razorpay({
  //   //   key_id: process.env.RAZORPAY_KEY,
  //   //   key_secret: process.env.RAZORPAY_SECRET,
  //   // });

  //   // const razorpay = new Razorpay({
  //   //   key_id: "rzp_test_i42zFDaD8R8cRS",
  //   //   key_secret: "SVbdVgj9StNbjyj33304HS1f",
  //   // });
  //   console.log("sam " + JSON.stringify(ctx.request.body.amount));
  //   const razorpay = new Razorpay({
  //     key_id: process.env.KEY_ID,
  //     key_secret: process.env.KEY_SECRET,
  //   });

  //   // Create an order -> generate the OrderID -> Send it to the Front-end
  //   // Also, check the amount and currency on the backend (Security measure)
  //   const payment_capture = 1;
  //   const amount = ctx.request.body.amount * 100;
  //   const currency = "INR";
  //   const options = {
  //     amount: amount,
  //     currency,
  //     receipt: shortid.generate(),
  //     payment_capture,
  //   };

  //   try {
  //     const response = await razorpay.orders.create(options);
  //     ctx.body = {
  //       id: response.id,
  //       currency: response.currency,
  //       amount: response.amount,
  //     };
  //   } catch (err) {
  //     console.log(err);
  //     ctx.body = err;
  //   }
  // },
};

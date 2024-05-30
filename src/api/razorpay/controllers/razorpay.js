'use strict';
const Razorpay = require("razorpay");
const shortid = require("shortid");
/**
 * A set of functions called "actions" for `razorpay`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
  generateorder:async (ctx, next) => {
     
      // Initialize razorpay object
      // const razorpay = new Razorpay({
      //   key_id: process.env.RAZORPAY_KEY,
      //   key_secret: process.env.RAZORPAY_SECRET,
      // });
  
      // const razorpay = new Razorpay({
      //   key_id: "rzp_test_i42zFDaD8R8cRS",
      //   key_secret: "SVbdVgj9StNbjyj33304HS1f",
      // });
console.log("sam "+JSON.stringify(ctx.request.body.amount))
      const razorpay = new Razorpay({
        key_id: "rzp_test_hTSzc7KeSl5FzN",
        key_secret: "7IJn5mKlJjWdfXnOYz7U4uLk",
      });

      // Create an order -> generate the OrderID -> Send it to the Front-end
      // Also, check the amount and currency on the backend (Security measure)
      const payment_capture = 1;
      const amount = ctx.request.body.amount * 100;
      const currency = "INR";
      const options = {
        amount: amount,
        currency,
        receipt: shortid.generate(),
        payment_capture,
      };
  
      try {
        const response = await razorpay.orders.create(options);
        ctx.body = {
          id: response.id,
          currency: response.currency,
          amount: response.amount,
        };
      } catch (err) {
        console.log(err);
        ctx.body = err;
      }
      
    }
};

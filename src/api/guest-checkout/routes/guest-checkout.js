"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/guest/send/otp",
      handler: "guest-checkout.mobileOtp",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/guest/resend-otp',
      handler: 'guest-checkout.resendOtp',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/guest/verify/otp",
      handler: "guest-checkout.verifyOtp",
      config: {
        policies: [],
      },
    }
    
    
  ],
};


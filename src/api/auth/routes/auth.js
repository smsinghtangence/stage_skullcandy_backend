// module.exports = {
//   routes: [
    // {
    //  method: 'GET',
    //  path: '/auth',
    //  handler: 'auth.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
//   ],
// };


module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/send/otp',
      handler: 'auth.sendOtp',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/verify-otp',
      handler: 'auth.verifyOtp',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/resend-otp',
      handler: 'auth.resendOtp',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/forget-password',
      handler: 'auth.forgetPassword',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/change-password',
      handler: 'auth.changePassword',
      config: {
        policies: [],
        middlewares: [],
      },
  },
    
  {
    method: "GET",
    path: "/alreadyUserEmailExist",
    handler: "auth.alreadyUserEmailExist",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/alreadyUserMobileExist",
    handler: "auth.alreadyUserMobileExist",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/checkout/register",
    handler: "auth.register",
    config: {
      policies: [],
    },
  }
  ],
};
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
  ],
};
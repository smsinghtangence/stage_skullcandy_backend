module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/razorpay',
     handler: 'razorpay.exampleAction',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'POST',
      path: '/razorpay',
      handler: 'razorpay.generateorder',
      config: {
        policies: [],
        middlewares: [], 
      },
     },
  ],
};

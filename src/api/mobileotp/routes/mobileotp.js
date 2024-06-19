module.exports = {
  routes: [
    {
      method: "POST",
      path: "/login",
      handler: "mobileotp.login",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/login/verify/:mobile",
      handler: "mobileotp.verify",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/mobileotp",
      handler: "mobileotp.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/view",
      handler: "mobileotp.get",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
  ],
};

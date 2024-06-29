module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/customer-logs',
      handler: 'customer-log.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ]

}

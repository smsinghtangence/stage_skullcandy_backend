'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/checkouts',
      handler: 'checkout.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

// {
//   method: 'GET',
//   path: '/checkouts',
//   handler: 'checkout.find',
//   config: {
//     policies: [],
//     middlewares: [],
//   },
// },
// {
//   method: 'GET',
//   path: '/checkouts/:id',
//   handler: 'checkout.findOne',
//   config: {
//     policies: [],
//     middlewares: [],
//   },
// },
// {
//   method: 'PUT',
//   path: '/checkouts/:id',
//   handler: 'checkout.update',
//   config: {
//     policies: [],
//     middlewares: [],
//   },
// },
// {
//   method: 'DELETE',
//   path: '/checkouts/:id',
//   handler: 'checkout.delete',
//   config: {
//     policies: [],
//     middlewares: [],
//   },
// },
'use strict';

// module.exports = ({ strapi }) => ({
//   index(ctx) {
//     ctx.body = strapi
//       .plugin('payu')
//       .service('myService')
//       .getToken();
//   },
// });


module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('payu')
      .service('auth')
      .getToken();
  },
});
// .getWelcomeMessage()
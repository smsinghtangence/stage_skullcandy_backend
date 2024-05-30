'use strict';
const payu = require("../utils/payu");
module.exports = ({ strapi }) => ({
async getToken() {
    const { settings } = await strapi
      .plugin('payu')
      .service('settings')
      .getSettings();
    const token = await payu.getToken(settings);
    return { token };
  }
});
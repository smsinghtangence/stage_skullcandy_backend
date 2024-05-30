const payu = require("../utils/payu");
module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  async getToken() {
    // Collect settings from database
    let config = await strapi
      .query('plugin::payu.conguration')
      .findOne();
    const collection = config.mode + '-settings';
    const settings = await strapi
      .query(`plugin::payu.${collection}`)
      .findOne();
    if (
      !settings || 
      !settings.clientId || 
      !settings.clientSecret || 
      !settings.payuAuthorizeUrl
    ) {
      return {error: `No PayU settings found - ${collection}`}
    }
    
    const token = await payu.getToken(settings);
    return { token }
  }
});
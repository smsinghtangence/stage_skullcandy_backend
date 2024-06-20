'use strict';

/**
 * refunds-return service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::refunds-return.refunds-return');

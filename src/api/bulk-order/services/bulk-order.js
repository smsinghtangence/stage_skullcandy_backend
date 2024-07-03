'use strict';

/**
 * bulk-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bulk-order.bulk-order');

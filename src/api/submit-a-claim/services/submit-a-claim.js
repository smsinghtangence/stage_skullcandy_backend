'use strict';

/**
 * submit-a-claim service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::submit-a-claim.submit-a-claim');

'use strict';

/**
 * notify-me-when-available service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notify-me-when-available.notify-me-when-available');

'use strict';

/**
 * press-releases service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::press-releases.press-releases');

'use strict';

const jwt = require('jsonwebtoken');

/**
 * `up_users` service
 */

module.exports = {
  generateJwtToken(user) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id, email: user.email },
        strapi.config.get('plugin.users-permissions.jwtSecret'),
        {
          expiresIn: '7d', // Token expiration time
        },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  },
};

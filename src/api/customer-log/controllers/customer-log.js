'use strict';

/**
 * A set of functions called "actions" for `customer-log`
 */

module.exports = {
  async create(ctx) {
    const { ip, mobile, user_status, username } = ctx.request.body;

    if (!ip || !mobile || !user_status) {
      return ctx.badRequest("IP, mobile, and user status are required");
    }

    try {
      const newLog = await strapi.query("api::customer-log.customer-log").create({
        data: {
          ip,
          mobile,
          user_status,
          username
        },
      });

      ctx.send({
        message: "Customer log created successfully",
        log: newLog,
      });
    } catch (err) {
      console.error("Error creating customer log:", err.message);
      ctx.throw(500, "Unable to create customer log");
    }
  },
};

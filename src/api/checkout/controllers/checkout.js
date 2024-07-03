// @ts-nocheck
'use strict';

/**
 * A set of functions called "actions" for `up_users`
 */

module.exports = {
  async create(ctx) {
    try {
      const { email, mobile, country, firstname, lastname, address1, address2, city, state, zipcode, userStatus } = ctx.request.body;

      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { mobile, email } });

      if (user) {
        return ctx.notFound('User Already Exist found');
      }

      const newUser = await strapi.query("plugin::users-permissions.user").create({
        data: {
          email,
          mobile,
          country,
          firstname,
          lastname,
          address1,
          address2,
          city,
          state,
          zipcode,
          userStatus: "1",
        },
      });

      const token = await strapi.services['api::checkout.checkout'].generateJwtToken(newUser);

      ctx.send({
        user: newUser,
        jwt: token,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};


// async find(ctx) {
//   try {
//     const users = await strapi.query('plugin::users-permissions.user').find(ctx.query);
//     ctx.send(users);
//   } catch (err) {
//     ctx.throw(500, err);
//   }
// },

// async findOne(ctx) {
//   try {
//     const { id } = ctx.params;
//     const user = await strapi.query('plugin::users-permissions.user').findOne({ id });

//     if (!user) {
//       return ctx.throw(404, 'User not found');
//     }

//     ctx.send(user);
//   } catch (err) {
//     ctx.throw(500, err);
//   }
// },

// async update(ctx) {
//   try {
//     const { id } = ctx.params;
//     const updates = ctx.request.body;

//     const updatedUser = await strapi.query('up_users').update({ id }, updates);
//     ctx.send(updatedUser);
//   } catch (err) {
//     ctx.throw(500, err);
//   }
// },

// async delete(ctx) {
//   try {
//     const { id } = ctx.params;
//     const deletedUser = await strapi.query('up_users').delete({ id });

//     ctx.send(deletedUser);
//   } catch (err) {
//     ctx.throw(500, err);
//   }
// },
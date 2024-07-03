module.exports = (plugin) => {
    plugin.controllers.user.updateMe = async (ctx) => {
        if (!ctx.state.user || !ctx.state.user.id) {
            return ctx.response.status = 401;
        }
        const addressData = ctx.request.body.Address;
        await strapi.entityService.update('plugin::users-permissions.user', ctx.state.user.id, {
            data: {
                Address: [{
                    first_name: addressData?.first_name,
                    last_name: addressData?.last_name,
                address_1: addressData?.address_1,
                address_2: addressData?.address_2,
                city: addressData?.city,
                state: addressData?.state,
                country: addressData?.country,
                postcode: addressData?.postcode,
                zipCode: addressData?.zipCode,
                phone: addressData?.phone,
                email: addressData?.email,
            }]
            },
            populate: ["Address"],
        }).then((res) => {
            ctx.response.status = 200;
        })
    }

    plugin.routes['content-api'].routes.push(
        {
            method: "PUT",
            path: "/user/me",
            handler: "user.updateMe",
            config: {
                prefix: "",
                policies: []
            }
        }
    )

    return plugin;
}
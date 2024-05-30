module.exports = {

    async afterCreate(event){
        const {result} = event;


        try{
            console.log("sanmeet"),
            await strapi.plugins['email'].services.email.send({
                to:'smsingh@tangence.com',
                from:'noreply@tangence.com',
                subject:'You have new order',
                text:`Your order is : ${result.name}`
            })
        } catch(err){
            console.log(err)
        }
    }
}
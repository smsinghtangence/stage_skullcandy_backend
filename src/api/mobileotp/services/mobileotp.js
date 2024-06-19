'use strict';


const jwt = require("jsonwebtoken");

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateToken(mobile) {
    const payload = { mobile };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '3d' };
    return jwt.sign(payload, secret, options);
}

module.exports = () => ({
    async create(data) {
        const otp = generateOtp();
        data.otp = otp; // Add OTP to the data object
        const createdOtp = await strapi.entityService.create("api::mobileotp.mobileotp", {
            data,
        });
        return { ...createdOtp, otp }; // Include OTP in the returned object
    },

    async get() {
        return await strapi.entityService.findMany("api::mobileotp.mobileotp");
    },

    sendSms(toNumber, otp) {
        console.log("toNumber",toNumber);
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioNum = process.env.TWILIONUM;
        const client = require("twilio")(accountSid, authToken);
        client.messages
            .create({
                body: `Your OTP is: ${otp}`,
                from: twilioNum, // the phone number provided by Twilio
                to: '+91'+toNumber, // recipient phone number
            })
            .then((message) => console.log(message.sid))
            .catch((error) => console.error(error));
    },

    async verifyOtp(mobile, otp) {
        const entries = await strapi.entityService.findMany("api::mobileotp.mobileotp", {
            filters: { mobile, otp },
        });
        if (entries.length > 0) {
            const token = generateToken(mobile);
            return { valid: true, token };
        } else {
            return { valid: false };
        }
    },
});



// function generateOtp() {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }

// module.exports = () => ({
//     async create(data) {
//         const otp = generateOtp();
//         data.otp = otp; // Add OTP to the data object
//         const createdOtp = await strapi.entityService.create("api::mobileotp.mobileotp", {
//             data,
//         });
//         return { ...createdOtp, otp }; // Include OTP in the returned object
//     },

//     async get() {
//         return await strapi.entityService.findMany("api::mobileotp.mobileotp");
//     },

//     sendSms(toNumber, otp) {
//         const accountSid = process.env.TWILIO_ACCOUNT_SID;
//         const authToken = process.env.TWILIO_AUTH_TOKEN;
//         const twilioNum = process.env.TWILIONUM;
//         const client = require("twilio")(accountSid, authToken);
//         client.messages
//             .create({
//                 body: `Your OTP is: ${otp}`,
//                 from: twilioNum, // the phone number provided by Twilio
//                 to: '+91' + toNumber, // recipient phone number
//             })
//             .then((message) => console.log(message.sid))
//             .catch((error) => console.error(error));
//     },

//     async verifyOtp(mobile, otp) {
//         const entries = await strapi.entityService.findMany("api::mobileotp.mobileotp", {
//             filters: { mobile, otp },
//         });
//         return entries.length > 0;
//     },
// });

/**
 * mobileotp service
 */

// module.exports = () => ({
//     async create(data) {
//       return await strapi.entityService.create("api::mobileotp.mobileotp", {
//         data,
//       });
//     },
  
//      async get() {
//       return await strapi.entityService.findMany("api::mobileotp.mobileotp");
//     },
//   });


// module.exports = {
//     sendSms() {
//       const accountSid = process.env.TWILIO_ACCOUNT_SID;
//       const authToken = process.env.TWILIO_AUTH_TOKEN;
//       const myNum = process.env.MYNUM;
//       const twilioNum = process.env.TWILIONUM;
//       const client = require("twilio")(accountSid, authToken);
//       client.messages
//         .create({
//           body: "Hello Admin, someone just posted a comment",
//           from: twilioNum, //the phone number provided by Twillio
//           to: myNum, // your own phone number
//         })
//         .then((message) => console.log(message.sid));

//     },
//   };


// module.exports = () => ({
//     async create(data) {
//         return await strapi.entityService.create("api::mobileotp.mobileotp", {
//             data,
//         });
//     },

//     async get() {
//         return await strapi.entityService.findMany("api::mobileotp.mobileotp");
//     },

    
//     sendSms(toNumber, otps) {
//         const accountSid = process.env.TWILIO_ACCOUNT_SID;
//         const authToken = process.env.TWILIO_AUTH_TOKEN;
//         const twilioNum = process.env.TWILIONUM;
//         const client = require("twilio")(accountSid, authToken);
//         client.messages
//             .create({
//                 body: `Your OTP is: ${otps}`,
//                 from: twilioNum,
//                 to: '+91'+ toNumber,
//             })
//             .then((message) => console.log(message.sid))
//             .catch((error) => console.error(error));
//     },
// });




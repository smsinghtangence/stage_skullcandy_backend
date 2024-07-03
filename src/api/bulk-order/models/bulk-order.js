
module.exports = {
    lifecycles: {
      async afterCreate(result, data) {
        console.log("Bulk order mail funciton")
        // const emailTemplate = {
        //   to: result.email,  
        //   from: 'no-reply@example.com',  
        //   subject: 'Order Confirmation',
        //   text: `Hello ${result.name},\n\nThank you for your order. Your order ID is ${result.id}.`,
        //   html: `<p>Hello ${result.name},</p><p>Thank you for your order. Your order ID is <strong>${result.id}</strong>.</p>`,
        // };
  
        // try {
        //   await strapi.plugins['email'].services.email.send(emailTemplate);
        //   strapi.log.info('Order confirmation email sent successfully.');
        // } catch (err) {
        //   strapi.log.error('Failed to send order confirmation email:', err);
        // }


        ///////////////
         
//             try {
//               const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                   user: process.env.USER_EMAIL,
//                   pass: process.env.USER_PASS,
//                 },
//               });
        
//               const mailOptions = {
//                 from: process.env.USER_EMAIL,
//                 to: process.env.SKULL_ADMIN_EMAIL,
//                 subject: `Bull Order Query from ${result?.fullName}`,
//                 text: `${result?.fullName}
//                 ${result?.company}
//                 ${result?.email}
//                 ${result?.phone}
//                 ${result?.state}
//                 ${result?.product}
//                 ${result?.quantity}
//                 ${result?.message}`,
//                 html: `<p>${result?.fullName}</p>
// <p>${result?.company}</p>
// <p>${result?.email}</p>
// <p>${result?.phone}</p>
// <p>${result?.state}</p>
// <p>${result?.product}</p>
// <p>${result?.quantity}</p>
// <p>${result?.message}</p>`,
        
//               };
        
//               await transporter.sendMail(mailOptions);
//               console.log('Email sent successfully');
//             } catch (error) {
//               console.error('Error sending email:', error);
//             }
         
        ///////////////
      },
    },
  };
  
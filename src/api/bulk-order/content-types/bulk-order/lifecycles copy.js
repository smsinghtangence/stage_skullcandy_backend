'use strict';

const nodemailer = require('nodemailer');
 

module.exports = ({ env }) => ({
  lifecycles: {
      async afterCreate(event){
        const {result} = event;
      


        console.log("Bulk order mail funciton")
         

        /////////////
         
            try {
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: env('USER_EMAIL'),
                  pass: env('USER_PASS'), 
                },
              });
        
              const mailOptions = {
                from: env('USER_EMAIL'),
                to: env('SKULL_ADMIN_EMAIL'),
                subject: `Bull Order Query from `,
                text: `text`,
        
              };
        
              await transporter.sendMail(mailOptions);
              console.log('Email sent successfully');
            } catch (error) {
              console.error('Error sending email:', error);
            }
         
        ///////////////
      },
    },
  });
  
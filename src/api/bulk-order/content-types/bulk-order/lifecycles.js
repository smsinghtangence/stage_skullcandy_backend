const nodemailer = require('nodemailer');
 

module.exports = {
 
    
        
   async afterCreate(event){
        const {result} = event;
        
        
      


        console.log("Bulk order mail funciton")
         

        
         
            try {
          
        
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
              },
            });
      
              // const mailOptions = {
              //   from: "techtangence@gmail.com",
              //   to: "sanmeet66@gmail.com",
              //   subject: `Bull Order Query from `,
              //   text: `text`,
        
              // };
              const mailOptions = {
                                from: process.env.USER_EMAIL,
                                to: process.env.SKULL_ADMIN_EMAIL,
                                subject: `Bull Order Query from ${result?.fullName}`,
                                text: `${result?.fullName}
                                ${result?.company}
                                ${result?.email}
                                ${result?.phone}
                                ${result?.state}
                                ${result?.product}
                                ${result?.quantity}
                                ${result?.message}`,
                                html: `<p>Name: ${result?.fullName}</p>
                <p>Company: ${result?.company}</p>
                <p>Email: ${result?.email}</p>
                <p>Phone: ${result?.phone}</p>
                <p>State: ${result?.state}</p>
                <p>Product: ${result?.product}</p>
                <p>Qunatity: ${result?.quantity}</p>
                <p>Special Requests: ${result?.message}</p>`,
                        
                              };
              await transporter.sendMail(mailOptions);
              console.log('Email sent successfully');
            } catch (error) {
              console.error('Error sending email:', error);
            }
         
        
      
    },
  };
  
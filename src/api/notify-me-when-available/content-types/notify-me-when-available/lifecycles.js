const nodemailer = require('nodemailer');
 

module.exports = {
 
    
        
   async afterCreate(event){
        const {result} = event;
        
        
      


        console.log("Submit claim mail funciton")
         

        
         
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
                                subject: `Notifyme when ${result?.product_name} available from ${result?.email}`,
                                text: `${result?.email}
                                ${result?.product_name}
                                ${result?.color}
                                 ${result?.sku}
                               `,
                                html: `<p>Email: ${result?.email}</p>
                 
                
                <p>Product Name: ${result?.product_name}</p>
                <p>Color: ${result?.color}</p>
                <p>SKU: ${result?.sku}</p>
                `,
                        
                              };
              await transporter.sendMail(mailOptions);
              console.log('Email sent successfully');
            } catch (error) {
              console.error('Error sending email:', error);
            }
         
        
      
    },
  };
  
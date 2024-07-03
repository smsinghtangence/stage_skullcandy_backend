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
                                subject: `Claim for ${result?.Product_Name} from ${result?.Your_Name}`,
                                text: `${result?.Your_Name}
                                ${result?.Seller_Name}
                                ${result?.Purchase_Date}
                                ${result?.Product_Name}
                                ${result?.Bill_Number}
                                ${result?.email}
                                ${result?.Phone_Number}
                                ${result?.State}
                                ${result?.Address}
                                ${result?.productIssues}`,
                                html: `<p>Name: ${result?.Your_Name}</p>
                <p>Seller Name: ${result?.Seller_Name}</p>
                <p>Purchase Date: ${result?.Purchase_Date}</p>
                <p>Product Name: ${result?.Product_Name}</p>
                <p>Bill Number: ${result?.Bill_Number}</p>
                <p>Email: ${result?.email}</p>
                <p>Phone Number: ${result?.Phone_Number}</p>
                <p>State: ${result?.State}</p>
                <p>Address: ${result?.Address}</p>
                <p>Product Issues: ${result?.productIssues}</p>`,
                        
                              };
              await transporter.sendMail(mailOptions);
              console.log('Email sent successfully');
            } catch (error) {
              console.error('Error sending email:', error);
            }
         
        
      
    },
  };
  
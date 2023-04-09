const nodeMailer=require('nodemailer'); 


const sendEmail = async options => {
  
    //creating a Transporter(SMTP)
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
  
      }
    })

  //message schema
  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  }
  try{
  await transporter.sendMail(message)
}
catch(err){
  console.log("error while sending the email",err); 
}
  };
  module.exports = sendEmail;
  